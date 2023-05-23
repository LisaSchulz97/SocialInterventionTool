package com.example.backend.questionnaire;

import com.example.backend.security.MongoUser;
import com.example.backend.security.MongoUserRepository;
import com.example.backend.security.Role;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Map;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class QuestionnaireIntegrationTests {
    @Autowired
    private MockMvc mvc;
    @Autowired
    private QuestionnaireRepo questionnaireRepo;
    @Autowired
    private MongoUserRepository mongoUserRepository;
    @Autowired
    private ObjectMapper mapper;
    private Questionnaire dummyQuestionnaire;
    private String jsonQuestionnaire;
    private MongoUser dummyUser;




    @BeforeEach
    void SetUp() throws Exception {
        dummyQuestionnaire = new Questionnaire(Map.of("1", true), "Heestweg 4", "22143", "3", 1, Status.OPEN, new ArrayList<>());
        jsonQuestionnaire = mapper.writeValueAsString(dummyQuestionnaire);
        dummyUser = new MongoUser("3", "Lisa", "Lisa1", Role.ADMIN);
    }

    @Test
    @WithMockUser(username = "Lisa", password = "Lisa1", roles = "ADMIN")
    @DirtiesContext
    void getAllQuestionnaires_expectedListWithOneElement_whenRepoHasOneElement() throws Exception {
        mongoUserRepository.save(dummyUser);
        questionnaireRepo.save(dummyQuestionnaire);
        mvc.perform(get("/api/questionnaire").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("[" + jsonQuestionnaire + "]"));
    }
    @Test
    @WithMockUser
    @DirtiesContext
    void getQuestionnaireById() throws Exception {
        questionnaireRepo.save(dummyQuestionnaire);
        mvc.perform(get("/api/questionnaire/" + dummyQuestionnaire.id()))
                .andExpect(status().isOk())
                .andExpect(content().json(jsonQuestionnaire));
    }
}
