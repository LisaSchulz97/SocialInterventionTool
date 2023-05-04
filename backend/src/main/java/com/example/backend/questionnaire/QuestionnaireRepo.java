package com.example.backend.questionnaire;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuestionnaireRepo extends MongoRepository<Questionnaire, String> {
}
