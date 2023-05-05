package com.example.backend.questionnaire;

import com.example.backend.organization.model.OrganizationTopic;

public record TopicScore(
        OrganizationTopic topic,
        int score
) {}