package com.example.backend.question;

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
class QuestionIntegrationTests {

    @Autowired
    private MockMvc mvc;
    @Autowired
    private QuestionRepo questionRepo;
    @Autowired
    private ObjectMapper mapper;
    private Question dummyQuestion;
    private String jsonQuestion;

    @BeforeEach
    void SetUp() throws Exception {
        dummyQuestion = new Question("1", "Besitzen Sie Schulden?", OrganizationTopic.ARMUT);
        jsonQuestion = mapper.writeValueAsString(dummyQuestion);
    }

    @Test
    @DirtiesContext
    void getAllQuestions_expectedListWithOneElement_whenRepoHasOneElement() throws Exception {
        questionRepo.save(dummyQuestion);
        mvc.perform(get("/api/question"))
                .andExpect(status().isOk())
                .andExpect(content().json("[" + jsonQuestion + "]"));
        System.out.println(jsonQuestion);
    }
}
