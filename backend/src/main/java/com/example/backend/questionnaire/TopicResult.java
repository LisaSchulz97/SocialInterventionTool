package com.example.backend.questionnaire;
import com.example.backend.organization.Organization;
import com.example.backend.organization.model.OrganizationTopic;

import java.util.List;

public record TopicResult(
        List<Organization> organizations,
        OrganizationTopic name,
        int score
) {
}
