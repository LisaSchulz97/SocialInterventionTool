package com.example.backend.organization.model;

public record Address(
        String street_and_number,
        String postal_code,
        String location,
        String maps
) {
}
