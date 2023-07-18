package com.example.backend.organization;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/organization", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class OrganizationController {

    private final OrganizationService organizationService;
    private final OrganizationRepo organizationRepo;


    @GetMapping
    public List<Organization> getOrganizations() {
        return organizationService.listOrganizations();
    }

    @GetMapping("{id}")
    public ResponseEntity<Organization> getOrganizationById(@PathVariable String id) {
        return ResponseEntity.ok(organizationService.findOrganizationById(id));
    }

    @PostMapping
    public ResponseEntity<Organization> postOrganization(@RequestBody Organization organization) {
        return new ResponseEntity<>(organizationService.addOrganization(organization), HttpStatus.CREATED);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Object> deleteOrganization(@PathVariable String id) {
        if (organizationRepo.existsById(id)) {
            organizationService.deleteOrganization(id);
            return ResponseEntity.noContent().build();
        }
        else return ResponseEntity.notFound().build();
    }

    @PutMapping("{id}")
    public ResponseEntity<Organization> updateOrganization(@PathVariable String id, @RequestBody Organization organization) {
        if (organizationRepo.existsById(id)) {
            var updatedOrganization = organizationService.updateOrganization(organization);
            return new ResponseEntity<>(updatedOrganization, HttpStatus.ACCEPTED);
        } else {
            return new ResponseEntity<>(organizationService.addOrganization(organization), HttpStatus.CREATED);
        }
    }


}
