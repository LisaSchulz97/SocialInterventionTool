package com.example.backend.questionnaire;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuestionnaireService {

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

}
