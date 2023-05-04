package com.example.backend.questionnaire;

import org.springframework.data.annotation.Id;

import java.util.Map;

public record Questionnaire(

        Map<Boolean, String> results,
        String street_and_number,
        String plz,
        @Id
        String Id,
        Boolean open
) {
}
