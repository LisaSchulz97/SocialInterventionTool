package com.example.backend.questionnaire;

import java.util.Map;

public record Questionnaire(

        Map<Boolean, String> results,
        String Street_and_Number,
        String Id
) {
}
