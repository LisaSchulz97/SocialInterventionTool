package com.example.backend.questionnaire;
import com.example.backend.security.MongoUser;
import org.springframework.data.annotation.Id;

import java.util.List;
import java.util.Map;

public record Questionnaire(
        Map<String, Boolean> results,
        String street_and_number,
        String plz,
        String userId,
        @Id
        int id,
        Status status,
        List<TopicResult> topicResultList
) {
        public Questionnaire withResult(List<TopicResult> topicResultList, int id) {
               return new Questionnaire(
                       this.results,
                       this.street_and_number,
                       this.plz,
                       this.userId,
                       id,
                       Status.IN_PROGRESS,
                       topicResultList
               );
        }

    public Questionnaire withStatus(Status status) {
        return new Questionnaire(
                this.results,
                this.street_and_number,
                this.plz,
                this.userId,
                this.id,
                status,
                this.topicResultList
        );
    }
    public Questionnaire withUserId(MongoUser mongoUser) {
        return new Questionnaire(
                this.results,
                this.street_and_number,
                this.plz,
                mongoUser.id(),
                this.id,
                this.status,
                this.topicResultList
        );
    }

}
