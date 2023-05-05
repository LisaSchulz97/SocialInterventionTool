package com.example.backend.questionnaire;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import java.util.Map;
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
    private ObjectMapper mapper;
    private Questionnaire dummyQuestionnaire;
    private String jsonQuestionnaire;



    @BeforeEach
    void SetUp() throws Exception {
        dummyQuestionnaire = new Questionnaire(Map.of(true, "1"), "Heestweg 4", "22143", "1", true);
        jsonQuestionnaire = mapper.writeValueAsString(dummyQuestionnaire);
    }

    @Test
    @DirtiesContext
    void getAllQuestionnaires_expectedListWithOneElement_whenRepoHasOneElement() throws Exception {
        questionnaireRepo.save(dummyQuestionnaire);
        mvc.perform(get("/api/questionnaire"))
                .andExpect(status().isOk())
                .andExpect(content().json("[" + jsonQuestionnaire + "]"));
        System.out.println(jsonQuestionnaire);
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
