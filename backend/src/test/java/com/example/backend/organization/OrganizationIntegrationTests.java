package com.example.backend.organization;

import com.example.backend.organization.model.Address;
import com.example.backend.organization.model.Contact;
import com.example.backend.organization.model.OrganizationCategory;
import com.example.backend.organization.model.OrganizationTopic;
import com.example.backend.security.MongoUser;
import com.example.backend.security.MongoUserRepository;
import com.example.backend.security.Role;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class OrganizationIntegrationTests {

    @Autowired
    private MockMvc mvc;
    @Autowired
    private OrganizationRepo organizationRepo;
    @Autowired
    private MongoUserRepository mongoUserRepository;
    @Autowired
    private ObjectMapper mapper;
    private Organization dummyOrganization;
    private MongoUser dummyUser;
    private String jsonGetOrganization;
    private String jsonMongoUser;
    private String jsonWithoutId;
    private String jsonMongoUserWithoutId;
    private String jsonPostOrganization;


    @BeforeEach
    void setUp() throws Exception {
        dummyUser = new MongoUser("564", "Carina", "Carina1", Role.ADMIN);
        jsonMongoUser = mapper.writeValueAsString(dummyUser);
        jsonMongoUserWithoutId = """
                {"username":"Carina","role":"ADMIN"}
                """;
        dummyOrganization = new Organization("123", "Beispielorganisation", OrganizationCategory.BERATUNG, OrganizationTopic.AUSBILDUNG, "gute Hilfe", new Contact(new Address("Steinstraße 1", "22089", "Hamburg-Wilhelmsburg", "maps.de"), "test@test.de", "0176432892", "blalba.de", "hallo.de"));
        jsonGetOrganization = """
                {
                    "name": "Beispielorganisation",
                    "category": "BERATUNG",
                    "topic": {
                        "name": "AUSBILDUNG",
                        "searchTerms": [
                            "keine Ausbildung",
                            "Schulabbruch",
                            "kein Abschluss",
                            "Ausbildung"
                        ]
                    },
                    "description": "gute Hilfe",
                    "contact": {
                        "address": {
                            "street_and_number": "Steinstraße 1",
                            "postal_code": "22089",
                            "location": "Hamburg-Wilhelmsburg",
                            "maps": "maps.de"
                        },
                        "e_mail": "test@test.de",
                        "phone": "0176432892",
                        "mailto": "blalba.de",
                        "website": "hallo.de"
                    }
                }
                """;
        jsonPostOrganization = """
                {
                    "name": "Beispielorganisation",
                    "category": "BERATUNG",
                    "topic": "AUSBILDUNG",
                    "description": "gute Hilfe",
                    "contact": {
                        "address": {
                            "street_and_number": "Steinstraße 1",
                            "postal_code": "22089",
                            "location": "Hamburg-Wilhelmsburg",
                            "maps": "maps.de"
                        },
                        "e_mail": "test@test.de",
                        "phone": "0176432892",
                        "mailto": "blalba.de",
                        "website": "hallo.de"
                    }
                }
                """;
        jsonWithoutId = """
                {"name":"Beispielorganisation","category":"BERATUNG","topic":"ARBEIT","description":"gute Hilfe","contact":{"address":{"street_and_number":"Steinstraße 1","postal_code":"22089",
                "location":"Hamburg-Wilhelmsburg","maps":"maps.de"},
                "e_mail":"test@test.de","phone":"0176432892","mailto":"blalba.de","website":"hallo.de"}}
                """;
    }


    @Test
    @DirtiesContext
    void getAllOrganizations_expectedListWithOneElement_whenRepoHasOneElement() throws Exception {
        organizationRepo.save(dummyOrganization);
        mvc.perform(get("/api/organization"))
                .andExpect(status().isOk())
                .andExpect(content().json("[" + jsonGetOrganization + "]"));
        System.out.println(jsonGetOrganization);
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DirtiesContext
    void postOrganization_expectOrganizationInRepository() throws Exception {
        String responseJson =
                mvc.perform(
                                post("/api/organization")
                                        .contentType(MediaType.APPLICATION_JSON)
                                        .content(jsonPostOrganization)
                                        .with(csrf()))
                        .andExpect(status().isCreated())
                        .andExpect(content().json(jsonGetOrganization))
                        .andExpect(jsonPath("$.id").isNotEmpty())
                        .andReturn()
                        .getResponse()
                        .getContentAsString();

        Organization actual = mapper.readValue(responseJson.replace("""
                {"name":"AUSBILDUNG","searchTerms":["keine Ausbildung","Schulabbruch","kein Abschluss","Ausbildung"]}""", """
                "AUSBILDUNG"
                """), Organization.class);
        Organization expected = new Organization(
                actual.id(),
                dummyOrganization.name(),
                dummyOrganization.category(),
                dummyOrganization.topic(),
                dummyOrganization.description(),
                dummyOrganization.contact());
        assertThat(organizationRepo.findAll()).contains(expected);
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DirtiesContext
    void deleteOrganization() throws Exception {
        organizationRepo.save(dummyOrganization);
        mvc.perform(delete("/api/organization/" + dummyOrganization.id())
                        .with(csrf()))
                .andExpect(status().isNoContent());
        assertThat(organizationRepo.findAll()).doesNotContain(dummyOrganization);
        mvc.perform(delete("/api/organization/" + dummyOrganization.id()).with(csrf()))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser
    @DirtiesContext
    void getOrganizationById() throws Exception {
        organizationRepo.save(dummyOrganization);
        mvc.perform(get("/api/organization/" + dummyOrganization.id()))
                .andExpect(status().isOk())
                .andExpect(content().json(jsonGetOrganization));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DirtiesContext
    void updateOrganizationCorrectExpectUpdatedOrganization() throws Exception {

        organizationRepo.save(dummyOrganization);

        Organization toUpdateOrganization = new Organization(dummyOrganization.id(), "Beispielorganisation", OrganizationCategory.BERATUNG, OrganizationTopic.AUSBILDUNG, "gute Hilfe", new Contact(new Address("Steinstraße 1", "22089", "Hamburg-Wilhelmsburg", "maps.de"), "test@test.de", "0176432892", "blalba.de", "hallo.de"));
        String jsonModifiedOrganization = mapper.writeValueAsString(toUpdateOrganization);
        String jsonPutModifiedOrganization = jsonModifiedOrganization.replace("""
                {"name":"AUSBILDUNG","searchTerms":["keine Ausbildung","Schulabbruch","kein Abschluss","Ausbildung"]}""", """
                "AUSBILDUNG"
                """);

        mvc.perform(put("/api/organization/" + dummyOrganization.id())
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonPutModifiedOrganization))
                .andExpect(status().isAccepted())
                .andExpect(content().json(jsonModifiedOrganization));


        Optional<Organization> actual = organizationRepo.findById(dummyOrganization.id());
        assertThat(actual).contains(toUpdateOrganization);
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DirtiesContext
    void updateOrganizationCreated_whenOrganizationDoesntExist() throws Exception {
        String responseJson =
                mvc.perform(put("/api/organization/" + dummyOrganization.id())
                                .with(csrf())
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonPostOrganization))
                        .andExpect(status().isCreated())
                        .andExpect(content().json(jsonGetOrganization))
                        .andExpect(jsonPath("$.id").isNotEmpty())
                        .andReturn()
                        .getResponse()
                        .getContentAsString();

        Organization actual = mapper.readValue(responseJson.replace("""
                {"name":"AUSBILDUNG","searchTerms":["keine Ausbildung","Schulabbruch","kein Abschluss","Ausbildung"]}""", """
                "AUSBILDUNG"
                """), Organization.class);
        Organization expected = new Organization(
                actual.id(),
                dummyOrganization.name(),
                dummyOrganization.category(),
                dummyOrganization.topic(),
                dummyOrganization.description(),
                dummyOrganization.contact());
        assertThat(organizationRepo.findAll()).contains(expected);
    }

    @Test
    @WithMockUser(username = "Carina", password = "Carina1")
    @DirtiesContext
    void getMongoUserByUsername() throws Exception {
        mongoUserRepository.save(dummyUser);
        mvc.perform(post("/api/user").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json(jsonMongoUserWithoutId));
    }
}
