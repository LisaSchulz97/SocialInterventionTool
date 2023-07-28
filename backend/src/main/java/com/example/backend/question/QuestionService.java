package com.example.backend.question;

import com.example.backend.organization.model.OrganizationTopic;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepo questionRepo;
    public List<Question> listQuestions() {
        return questionRepo.findAll();

    }

    public List<Question> getQuestionsByTopic(OrganizationTopic topic) {
        return questionRepo.findAllByTopic(topic);

    }

    public Question findQuestionById(String id) {
       Optional <Question> question = questionRepo.findById(id);

        if (question.isEmpty()) {
            throw new NoSuchElementException("Question with id: " + id + " not found");
        }

        return question.get();
    }
}


