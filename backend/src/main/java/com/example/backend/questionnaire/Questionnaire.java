package com.example.backend.questionnaire;
import org.springframework.data.annotation.Id;
import java.util.Map;

public record Questionnaire(
        Map<String, Boolean> results,
        String street_and_number,
        String plz,
        @Id
        String id,
        Status status,
        FinalResult finalResult
) {

}
