package com.example.backend.organization;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganizationRepo extends MongoRepository<Organization, String> {


}
