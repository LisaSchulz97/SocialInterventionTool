package com.example.backend.questionnaire;

import com.example.backend.organization.model.OrganizationTopic;
import com.example.backend.question.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@RequiredArgsConstructor
public class QuestionnaireService {


    private final QuestionService questionService;
    private final QuestionnaireRepo questionnaireRepo;

    public List<Questionnaire> listQuestionnaires() {
        return questionnaireRepo.findAll();
    }

    public Object findQuestionnaireById(String id) {

        Optional<Questionnaire> questionnaire = questionnaireRepo.findById(id);

        if (questionnaire.isEmpty()) {
            throw new NoSuchElementException("Questionnaire with id: " + id + " not found");
        }

        return questionnaire.get();
    }


    public Map<OrganizationTopic, Integer> calculateTopicScore(Questionnaire questionnaire) {
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
                    .map(question -> question.id())
                    .toList();
            long score = questionnaire.results().entrySet()
                    .stream()
                    .filter(entry -> topicQuestions.contains(entry.getKey()))
                    .filter(Map.Entry::getValue)
                    .count();
            results.put(topic, (int) score);
        }
        List<TopicResult> topicResultList = new ArrayList<>();
        results.entrySet().stream().forEach(entry -> {
            topicResultList.add(new TopicResult(Collections.emptyList(), entry.getKey(), entry.getValue()));
        });
        questionnaireRepo.save(questionnaire.withResult(topicResultList));
        return results;
    }

}

