package com.example.backend.organization;

import com.example.backend.organization.model.Address;
import com.example.backend.organization.model.Contact;
import com.example.backend.organization.model.OrganizationCategory;
import com.example.backend.organization.model.OrganizationTopic;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;


import static org.assertj.core.api.Assertions.assertThat;
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
    private ObjectMapper mapper;
    private Organization dummyOrganization;
    private String jsonOrganization;
    private String jsonWithoutId;

    @BeforeEach
    void setUp() throws Exception {
        dummyOrganization = new Organization("123", "Beispielorganisation", OrganizationCategory.BERATUNG, OrganizationTopic.ARBEIT, "gute Hilfe", new Contact(new Address("Steinstraße 1", "22089", "Hamburg-Wilhelmsburg", "maps.de"), "test@test.de", "0176432892", "blalba.de", "hallo.de"));
        jsonOrganization = mapper.writeValueAsString(dummyOrganization);
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
                .andExpect(content().json("[" + jsonOrganization + "]"));
        System.out.println(jsonOrganization);
    }

    @Test
    @DirtiesContext
    void postOrganization_expectOrganizationInRepository() throws Exception {
        String responseJson =
                mvc.perform(
                                post("/api/organization")
                                        .contentType(MediaType.APPLICATION_JSON)
                                        .content(jsonOrganization))
                        .andExpect(status().isCreated())
                        .andExpect(content().json(jsonWithoutId))
                        .andExpect(jsonPath("$.id").isNotEmpty())
                        .andReturn()
                        .getResponse()
                        .getContentAsString();

        Organization actual = mapper.readValue(responseJson, Organization.class);
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
    @DirtiesContext
    void deleteOrganization() throws Exception {
        organizationRepo.save(dummyOrganization);
        mvc.perform(delete("/api/organization/" + dummyOrganization.id()))
                .andExpect(status().isNoContent());
        assertThat(organizationRepo.findAll()).doesNotContain(dummyOrganization);
        mvc.perform(delete("/api/organization/" + dummyOrganization.id()))
                .andExpect(status().isNotFound());
    }

    @Test
    @DirtiesContext
    void getOrganizationById() throws Exception {
        organizationRepo.save(dummyOrganization);
        mvc.perform(get("/api/organization/" + dummyOrganization.id()))
                .andExpect(status().isOk())
                .andExpect(content().json(jsonOrganization));
    }
}
