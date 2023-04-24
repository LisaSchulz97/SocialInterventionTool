package com.example.backend.organization;
import com.example.backend.organization.model.Contact;
import com.example.backend.organization.model.OrganizationCategory;
import com.example.backend.organization.model.OrganizationTopic;
import org.springframework.data.annotation.Id;


public record Organization(

        @Id
        String id,
        String name,
        OrganizationCategory category,
        OrganizationTopic topic,
        String description,
        Contact contact


) {
}
