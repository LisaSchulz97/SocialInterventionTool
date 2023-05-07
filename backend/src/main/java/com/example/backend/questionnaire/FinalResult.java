package com.example.backend.questionnaire;
import com.example.backend.organization.Organization;
import com.example.backend.organization.model.OrganizationTopic;
import java.util.List;
import java.util.Map;

public record FinalResult(
        Map<OrganizationTopic, List<Organization>> organizations,
        TopicScore topicScore
) {
}
