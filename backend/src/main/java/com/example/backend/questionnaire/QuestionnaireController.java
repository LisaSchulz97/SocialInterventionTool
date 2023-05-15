package com.example.backend.questionnaire;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
    public ResponseEntity<Questionnaire> getQuestionnaireById(@PathVariable int id) {
        return ResponseEntity.ok((Questionnaire)questionnaireService.findQuestionnaireById(id));
    }
    @PutMapping("{id}")
    public ResponseEntity<Questionnaire> putQuestionnaire(@PathVariable int id, @RequestBody Questionnaire questionnaire) {
        if (!(id == questionnaire.id())) {
            throw new IllegalArgumentException("Id's must match");
        }
        return ResponseEntity.ok(questionnaireService.updateQuestionnaire(questionnaire));
    }
    @PostMapping
    public ResponseEntity<Questionnaire> postTopicScore(@RequestBody Questionnaire questionnaire) {
        return new ResponseEntity<>(questionnaireService.calculateTopicScore(questionnaire), HttpStatus.CREATED);
    }
}
