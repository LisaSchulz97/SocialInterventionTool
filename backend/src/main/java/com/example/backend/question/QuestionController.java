package com.example.backend.question;


import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping(value = "/api/question", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    @GetMapping
    public List<Question> getQuestions() {
        return questionService.listQuestions();
    }

    @GetMapping("{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable String id) {
        return ResponseEntity.ok(questionService.findQuestionById(id));
    }
}
