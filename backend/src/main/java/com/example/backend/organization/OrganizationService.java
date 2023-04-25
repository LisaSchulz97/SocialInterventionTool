package com.example.backend.organization;

import com.example.backend.organization.service.IdService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrganizationService {

    private final OrganizationRepo organizationRepo;
    private final IdService idService;


    public List<Organization> listOrganizations() {
        return organizationRepo.findAll();
    }


    public Organization addOrganization(Organization organization) {
        String newId = idService.createId();
        Organization newOrganization = new Organization(
                newId,
                organization.name(),
                organization.category(),
                organization.topic(),
                organization.description(),
                organization.contact()
        );
        return organizationRepo.save(newOrganization);
    }

    public void deleteOrganization(String id) {
        organizationRepo.deleteById(id);
    }
}
