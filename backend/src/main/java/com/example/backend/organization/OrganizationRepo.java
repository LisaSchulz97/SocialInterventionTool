package com.example.backend.organization;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrganizationRepo extends MongoRepository<Organization, String> {


}
