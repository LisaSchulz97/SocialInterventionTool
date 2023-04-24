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


    @GetMapping
    public List<Organization> getOrganizations() {
        return organizationService.listOrganizations();
    }

    @PostMapping
    public ResponseEntity<Organization> postProduct(@RequestBody Organization organization) {
        return new ResponseEntity<>(organizationService.addOrganization(organization), HttpStatus.CREATED);
    }


}
