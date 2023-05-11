package com.example.backend.questionnaire;
import org.springframework.data.annotation.Id;

import java.util.List;
import java.util.Map;

public record Questionnaire(
        Map<String, Boolean> results,
        String street_and_number,
        String plz,
        @Id
        String id,
        Status status,
        List<TopicResult> topicResultList
) {
        public Questionnaire withResult(List<TopicResult> topicResultList) {
               return new Questionnaire(
                       this.results,
                       this.street_and_number,
                       this.plz,
                       this.id,
                       Status.IN_PROGRESS,
                       topicResultList
               );
        }

}
