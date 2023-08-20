package com.example.backend.questionnaire;

import com.example.backend.organization.OrganizationService;
import com.example.backend.organization.model.OrganizationTopic;
import com.example.backend.question.Question;
import com.example.backend.question.QuestionService;
import com.example.backend.questionnaire.counter.CounterService;
import com.example.backend.security.MongoUser;
import com.example.backend.security.MongoUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
@RequiredArgsConstructor
public class QuestionnaireService {
    private final QuestionService questionService;
    private final QuestionnaireRepo questionnaireRepo;
    private final OrganizationService organizationService;
    private final CounterService counterService;
    private final MongoUserDetailsService mongoUserDetailsService;


    public Questionnaire updateQuestionnaire(Questionnaire questionnaire) {
        Questionnaire questionnaire1 = questionnaireRepo.findById(questionnaire.id()).orElseThrow();
        return questionnaireRepo.save(questionnaire1.withStatus(questionnaire.status()));
    }

    public List<Questionnaire> listQuestionnaires() {
        return questionnaireRepo.findAll();
    }

    public Questionnaire findQuestionnaireById(Integer id) {
        Optional<Questionnaire> questionnaire = questionnaireRepo.findById(id);

        if (questionnaire.isEmpty()) {
            throw new NoSuchElementException("Questionnaire with id: " + id + " not found");
        }
        return questionnaire.get();
    }

    public Questionnaire calculateTopicScore(Questionnaire questionnaire) {
        Set<OrganizationTopic> topicSet = Set.of(
                OrganizationTopic.PFLEGE,
                OrganizationTopic.ARBEIT,
                OrganizationTopic.ARMUT,
                OrganizationTopic.AUSBILDUNG,
                OrganizationTopic.BEZIEHUNG,
                OrganizationTopic.EINSAMKEIT,
                OrganizationTopic.ERKRANKUNG,
                OrganizationTopic.KULTUR,
                OrganizationTopic.MISSBRAUCH,
                OrganizationTopic.WOHNUNG
        );
        Map<OrganizationTopic, Integer> results = new EnumMap<>(OrganizationTopic.class);
        for (OrganizationTopic topic : topicSet) {
            List<String> topicQuestions = questionService.getQuestionsByTopic(topic)
                    .stream()
                    .map(Question::id)
                    .toList();
            long score = questionnaire.results().entrySet()
                    .stream()
                    .filter(entry -> topicQuestions.contains(entry.getKey()))
                    .filter(Map.Entry::getValue)
                    .count();
            results.put(topic, (int) score);
        }
        List<TopicResult> topicResultList = new ArrayList<>();
        results.forEach((key, value) -> topicResultList.add(
                new TopicResult(
                        organizationService.findRandomOrganizations(key, value),
                        key,
                        value)));
        int nextId = counterService.nextId(questionnaire.userId());
        questionnaireRepo.deleteById(nextId);
        return questionnaireRepo.save(questionnaire.withResult(topicResultList, nextId).withUserId(questionnaire.userId()));
    }

    public List<Questionnaire> getQuestionnairesByUserId() {
        List<Questionnaire> questionnaires = new ArrayList<>();
        MongoUser mongoUser = mongoUserDetailsService.getAuthenticatedUser();
        for (Questionnaire questionnaire : questionnaireRepo.findAll()) {
            if (mongoUser.id().equals(questionnaire.userId())) {
                questionnaires.add(questionnaire);
            }
        }
        return questionnaires;
    }
}