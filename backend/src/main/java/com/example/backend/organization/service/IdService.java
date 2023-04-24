package com.example.backend.organization.service;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class IdService {

    public String createId() {
        return UUID.randomUUID().toString();
    }
}

