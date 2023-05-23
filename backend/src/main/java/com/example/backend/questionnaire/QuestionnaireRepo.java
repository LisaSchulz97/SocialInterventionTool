package com.example.backend.questionnaire;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionnaireRepo extends MongoRepository<Questionnaire, Integer> {
}
