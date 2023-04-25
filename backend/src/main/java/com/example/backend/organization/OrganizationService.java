package com.example.backend.organization;

import com.example.backend.organization.service.IdService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

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

    public Organization findOrganizationById(String id) {
        Optional<Organization> organization = organizationRepo.findById(id);

        if (organization.isEmpty()) {
            throw new NoSuchElementException("Organization with id: " + id + " not found");
        }

        return organization.get();
    }
}
