package com.example.backend.organization;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrganizationService {

    private final OrganizationRepo organizationRepo;

    public List<Organization> listOrganizations() {
        return organizationRepo.findAll();
    }



}
