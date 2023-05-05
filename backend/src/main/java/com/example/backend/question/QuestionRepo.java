package com.example.backend.question;

import com.example.backend.organization.model.OrganizationTopic;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepo extends MongoRepository<Question, String> {
    List<Question> findAllByTopic(OrganizationTopic topic);
}
