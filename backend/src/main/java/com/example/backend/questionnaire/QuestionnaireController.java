package com.example.backend.questionnaire;

import com.example.backend.organization.model.OrganizationTopic;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

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

    @PostMapping
    public ResponseEntity<Map<OrganizationTopic, Integer>> postTopicScore(@RequestBody Questionnaire questionnaire) {
        return new ResponseEntity<>(questionnaireService.calculateTopicScore(questionnaire), HttpStatus.CREATED);
    }
}
