package com.example.backend.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class SecurityIntegrationTests {
    @Autowired
    private MockMvc mvc;
    @Autowired
    private MongoUserRepository mongoUserRepository;
    private MongoUser dummyUser;
    private String jsonMongoUserWithoutId;


    @BeforeEach
    void setUp() {
        dummyUser = new MongoUser("564", "Carina", "Carina1", Role.ADMIN);
        jsonMongoUserWithoutId = """
                {"username":"Carina","role":"ADMIN"}
                """;
    }

        @Test
        @WithMockUser(username = "Carina", password = "Carina1")
        void getMongoUserByUsername() throws Exception {
            mongoUserRepository.save(dummyUser);
            mvc.perform(post("/api/user").with(csrf()))
                    .andExpect(status().isOk())
                    .andExpect(content().json(jsonMongoUserWithoutId));
        }
}
