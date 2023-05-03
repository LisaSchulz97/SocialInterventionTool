package com.example.backend.security;

public record MongoUserDTO(
        String id,
        String username,
        Role role
) {
}
