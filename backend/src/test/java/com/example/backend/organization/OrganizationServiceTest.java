package com.example.backend.organization;

import com.example.backend.organization.model.Address;
import com.example.backend.organization.model.Contact;
import com.example.backend.organization.model.OrganizationCategory;
import com.example.backend.organization.model.OrganizationTopic;
import com.example.backend.organization.service.IdService;
import com.example.backend.security.MongoUser;
import com.example.backend.security.MongoUserDetailsService;
import com.example.backend.security.MongoUserRepository;
import com.example.backend.security.Role;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.catchException;
import static org.mockito.Mockito.*;

class OrganizationServiceTest {

    private final OrganizationRepo organizationRepo = mock(OrganizationRepo.class);
    private final MongoUserRepository mongoUserRepository = mock(MongoUserRepository.class);
    private final IdService idService = mock(IdService.class);
    private final OrganizationService organizationService = new OrganizationService(organizationRepo, idService);
    private final MongoUserDetailsService mongoUserDetailsService = new MongoUserDetailsService(mongoUserRepository);
    private Organization organization, organizationWithoutId;
    private MongoUser mongoUser;



    @BeforeEach
    void setUp() {
        organization = new Organization("123", "Beispielorganisation", OrganizationCategory.BERATUNG, OrganizationTopic.ARBEIT, "gute Hilfe", new Contact(new Address("Steinstraße 1", "22089", "Hamburg-Wilhelmsburg", "maps.de"), "test@test.de", "0176432892", "blalba.de", "hallo.de"));
        organizationWithoutId = new Organization("","Beispielorganisation", OrganizationCategory.BERATUNG, OrganizationTopic.ARBEIT, "gute Hilfe", new Contact(new Address("Steinstraße 1", "22089", "Hamburg-Wilhelmsburg", "maps.de"), "test@test.de", "0176432892", "blalba.de", "hallo.de"));
        mongoUser = new MongoUser("564", "Carina", "Carina1", Role.ADMIN);
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

    @Test
    void findMongoUserByUsernameWhenUserExists() {
        //Given
        when(mongoUserRepository.findMongoUserByUsername(mongoUser.username()))
                .thenReturn(Optional.ofNullable(mongoUser));

        // When
        MongoUser actual = mongoUserDetailsService.findMongoUserByUsername(mongoUser.username());

        // Then
        verify(mongoUserRepository).findMongoUserByUsername(mongoUser.username());
        assertThat(actual).isEqualTo(mongoUser);
    }

    @Test
    void throwUsernameNotFoundExceptionWhenUsernameDoesntExists() {
        //Given
        when(mongoUserRepository.findMongoUserByUsername("false-username"))
                .thenReturn(Optional.empty());

        //When
        Exception actual = catchException(() -> mongoUserDetailsService.findMongoUserByUsername("false-username"));
        UsernameNotFoundException expected = new UsernameNotFoundException("User not found!");

        //Then
        verify(mongoUserRepository).findMongoUserByUsername("false-username");
        assertThat(actual).isInstanceOf(expected.getClass()).hasMessageContaining("false-username");
    }
}

