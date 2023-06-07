package com.example.backend.questionnaire.counter;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CounterRepo extends MongoRepository<Counter, String> {
}
