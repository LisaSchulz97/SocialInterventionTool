package com.example.backend.organization;

import com.example.backend.organization.model.Address;
import com.example.backend.organization.model.Contact;
import com.example.backend.organization.model.OrganizationCategory;
import com.example.backend.organization.model.OrganizationTopic;
import com.example.backend.organization.service.IdService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class OrganizationServiceTest {

    private final OrganizationRepo organizationRepo = mock(OrganizationRepo.class);
    private final IdService idService = mock(IdService.class);
    private final OrganizationService organizationService = new OrganizationService(organizationRepo, idService);
    private Organization organization, organizationWithoutId;



    @BeforeEach
    void setUp() {
        organization = new Organization("123", "Beispielorganisation", OrganizationCategory.BERATUNG, OrganizationTopic.ARBEIT, "gute Hilfe", new Contact(new Address("Steinstraße 1", "22089", "Hamburg-Wilhelmsburg", "maps.de"), "test@test.de", "0176432892", "blalba.de", "hallo.de"));
        organizationWithoutId = new Organization("","Beispielorganisation", OrganizationCategory.BERATUNG, OrganizationTopic.ARBEIT, "gute Hilfe", new Contact(new Address("Steinstraße 1", "22089", "Hamburg-Wilhelmsburg", "maps.de"), "test@test.de", "0176432892", "blalba.de", "hallo.de"));
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

    @Test
    void saveOrganization() {
        //Given
        when(idService.createId())
                .thenReturn("123");
        when(organizationRepo.save(organization))
                .thenReturn(organization);

        //When
        Organization actual = organizationService.addOrganization(organizationWithoutId);

        //Then
        verify(idService).createId();
        verify(organizationRepo).save(organization);
        assertThat(actual).isEqualTo(organization);
    }
    @Test
    void deleteOrganization() {
        //GIVEN
        Organization organization = new Organization("123", "Beispielorganisation", OrganizationCategory.BERATUNG, OrganizationTopic.ARBEIT, "gute Hilfe", new Contact(new Address("Steinstraße 1", "22089", "Hamburg-Wilhelmsburg", "maps.de"), "test@test.de", "0176432892", "blalba.de", "hallo.de"));

        //WHEN
        organizationService.deleteOrganization("123");

        //THEN
        verify(organizationRepo).deleteById("123");
    }

    @Test
    void findOrganizationById_expectOrganization_whenOrganizationExists() {
        //Given
        when(organizationRepo.findById(organization.id()))
                .thenReturn(Optional.ofNullable(organization));

        // When
        Organization actual = organizationService.findOrganizationById(organization.id());

        // Then
        verify(organizationRepo).findById(organization.id());
        assertThat(actual).isEqualTo(organization);

    }

    @Test
    void updateOrganizationWhenOrganizationIdExists() {
        //Given
        when(organizationRepo.save(organization))
                .thenReturn(organization);

        //When
        Organization actual = organizationService.updateOrganization(organization);

        //Then
        Organization expected = organization;
        verify(organizationRepo).save(organization);
        assertThat(actual).isEqualTo(expected);
    }
}

