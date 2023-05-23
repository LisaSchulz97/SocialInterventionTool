package com.example.backend.organization;

import com.example.backend.organization.model.OrganizationTopic;
import com.example.backend.question.Question;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrganizationRepo extends MongoRepository<Organization, String> {

    List<Organization> findAllByTopic(OrganizationTopic topic);


}
