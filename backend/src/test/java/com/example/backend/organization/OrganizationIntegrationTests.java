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
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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

        private String jsonProduct;

        @BeforeEach
        void setUp() throws Exception {
            dummyOrganization = new Organization("123", "Beispielorganisation", OrganizationCategory.BERATUNG, OrganizationTopic.ARBEIT, "gute Hilfe", new Contact(new Address("Steinstraße 1", "22089", "Hamburg-Wilhelmsburg", "maps.de"), "test@test.de", "0176432892", "blalba.de", "hallo.de"));
            jsonProduct = mapper.writeValueAsString(dummyOrganization);
        }


        @Test
        @DirtiesContext
        void getAllOrganizations_expectedListWithOneElement_whenRepoHasOneElement() throws Exception {
            organizationRepo.save(dummyOrganization);
            mvc.perform(get("/api/organization"))
                    .andExpect(status().isOk())
                    .andExpect(content().json("[" + jsonProduct + "]"));
        }

    }
