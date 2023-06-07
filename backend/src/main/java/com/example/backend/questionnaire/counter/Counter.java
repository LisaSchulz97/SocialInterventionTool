package com.example.backend.questionnaire.counter;

import org.springframework.data.annotation.Id;

public record
Counter(
        @Id
        String id,
        int nextId

) {

}
