package com.example.backend.question;

import com.example.backend.organization.model.OrganizationTopic;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class QuestionServiceTest {

    private final QuestionRepo questionRepo = mock(QuestionRepo.class);
    private final QuestionService questionService = new QuestionService(questionRepo);
    private Question question;

    @BeforeEach
    void SetUp() {
        question = new Question("1", "Besitzen Sie Schulden?", OrganizationTopic.ARMUT);
    }

    @Test
    void findAllQuestions_expectedEmptyList_WhenRepositoryIsEmpty() {
        //Given
        when(questionRepo.findAll())
                .thenReturn(Collections.emptyList());

        //When
        List<Question> actual = questionService.listQuestions();

        //Then
        verify(questionRepo).findAll();
        assertThat(actual).isInstanceOf(List.class).isEmpty();

    }

    @Test
    void findAllQuestions_expectedListWithOneQuestion_WhenRepoContainsOneQuestion() {
        //Given
        when(questionRepo.findAll())
                .thenReturn(List.of(question));

        //When
        List<Question> actual = questionService.listQuestions();

        //Then
        verify(questionRepo).findAll();
        assertThat(actual).isInstanceOf(List.class).contains(question);
    }
}
