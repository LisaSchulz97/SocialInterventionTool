package com.example.backend.questionnaire;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/questionnaire", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class QuestionnaireController {

    private final QuestionnaireService questionnaireService;

    @GetMapping
    public List<Questionnaire> getQuestionnaires() {
        return questionnaireService.listQuestionnaires();
    }

    @GetMapping("{id}")
    public ResponseEntity<Questionnaire> getQuestionnaireById(@PathVariable String id) {
        return ResponseEntity.ok((Questionnaire)questionnaireService.findQuestionnaireById(id));
    }
}
