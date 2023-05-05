package com.example.backend.question;

import com.example.backend.organization.Organization;
import com.example.backend.organization.model.OrganizationTopic;
import com.example.backend.security.MongoUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
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
}


