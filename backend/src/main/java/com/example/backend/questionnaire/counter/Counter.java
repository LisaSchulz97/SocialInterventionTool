package com.example.backend.questionnaire.counter;

import org.springframework.data.annotation.Id;

public record
Counter(
        @Id
        Integer id,
        int nextId

) {

}
