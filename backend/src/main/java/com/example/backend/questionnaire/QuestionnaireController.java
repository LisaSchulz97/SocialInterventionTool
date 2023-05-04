package com.example.backend.questionnaire;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/questionnaire", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class QuestionnaireController {
}
