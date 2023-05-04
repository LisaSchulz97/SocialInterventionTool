package com.example.backend.question;

import com.example.backend.organization.model.OrganizationTopic;
import org.springframework.data.annotation.Id;

public record Question(
        @Id
        String Id,
        String poll,
        OrganizationTopic topic

) {

}
