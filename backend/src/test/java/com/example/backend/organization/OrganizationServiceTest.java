package com.example.backend.organization;

import com.example.backend.organization.model.Address;
import com.example.backend.organization.model.Contact;
import com.example.backend.organization.model.OrganizationCategory;
import com.example.backend.organization.model.OrganizationTopic;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class OrganizationServiceTest {

    private final OrganizationRepo organizationRepo = mock(OrganizationRepo.class);
    private final OrganizationService organizationService = new OrganizationService(organizationRepo);
    private Organization organization;


    @BeforeEach
    void setUp() {
        organization = new Organization("123", "Beispielorganisation", OrganizationCategory.BERATUNG, OrganizationTopic.ARBEIT, "gute Hilfe", new Contact(new Address("Steinstraße 1", "22089", "Hamburg-Wilhelmsburg", "maps.de"), "test@test.de", "0176432892", "blalba.de", "hallo.de"));
    }

    @Test
    void findAllOrganizations_expectedEmptyList_WhenRepositoryIsEmpty() {
        //Given
        when(organizationRepo.findAll())
                .thenReturn(Collections.emptyList());

        //When
        List<Organization> actual = organizationService.listOrganizations();

        //Then
        verify(organizationRepo).findAll();
        assertThat(actual).isInstanceOf(List.class).isEmpty();

    }

    @Test
    void findAllOrganizations_expectedListWithOneOrganization_WhenRepoContainsOneOrganization() {
        //Given
        when(organizationRepo.findAll())
                .thenReturn(List.of(organization));

        //When
        List<Organization> actual = organizationService.listOrganizations();

        //Then
        verify(organizationRepo).findAll();
        assertThat(actual).isInstanceOf(List.class).contains(organization);
    }

}

