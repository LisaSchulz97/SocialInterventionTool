package com.example.backend.questionnaire;

import com.example.backend.question.QuestionRepo;
import com.example.backend.question.QuestionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class QuestionnaireServiceTest {
    private final QuestionnaireRepo questionnaireRepo = mock(QuestionnaireRepo.class);
    private final QuestionRepo questionRepo = mock(QuestionRepo.class);
    private final QuestionService questionService = new QuestionService(questionRepo);
    private final QuestionnaireService questionnaireService = new QuestionnaireService(questionService, questionnaireRepo);
    private Questionnaire questionnaire;

    @BeforeEach
    void SetUp() {
        questionnaire = new Questionnaire(Map.of("1", true), "Heestweg 4", "22143", "1",true);
    }

    @Test
    void findAllQuestionnaires_expectedEmptyList_WhenRepositoryIsEmpty() {
        //Given
        when(questionnaireRepo.findAll())
                .thenReturn(Collections.emptyList());

        //When
        List<Questionnaire> actual = questionnaireService.listQuestionnaires();

        //Then
        verify(questionnaireRepo).findAll();
        assertThat(actual).isInstanceOf(List.class).isEmpty();

    }

    @Test
    void findAllQuestionnaires_expectedListWithOneQuestionnaire_WhenRepoContainsOneQuestionnaire() {
        //Given
        when(questionnaireRepo.findAll())
                .thenReturn(List.of(questionnaire));

        //When
        List<Questionnaire> actual = questionnaireService.listQuestionnaires();

        //Then
        verify(questionnaireRepo).findAll();
        assertThat(actual).isInstanceOf(List.class).contains(questionnaire);
    }

    @Test
    void findQuestionnaireById_expectQuestionnaire_whenQuestionnaireExists() {
        //Given
        when(questionnaireRepo.findById(questionnaire.id()))
                .thenReturn(Optional.ofNullable(questionnaire));

        // When
        Questionnaire actual = (Questionnaire) questionnaireService.findQuestionnaireById(questionnaire.id());

        // Then
        verify(questionnaireRepo).findById(questionnaire.id());
        assertThat(actual).isEqualTo(questionnaire);

    }
}