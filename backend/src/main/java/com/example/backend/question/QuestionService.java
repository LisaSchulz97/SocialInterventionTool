package com.example.backend.question;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepo questionRepo;
    public List<Question> listQuestions() {
        return questionRepo.findAll();

    }
}
