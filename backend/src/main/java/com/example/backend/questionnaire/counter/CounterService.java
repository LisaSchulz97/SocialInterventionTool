package com.example.backend.questionnaire.counter;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CounterService {

    private final CounterRepo counterRepo;

    public int nextId() {
        Counter counter = counterRepo.findById(0).get();
        if (counter.nextId() == 99) {
            counterRepo.save(new Counter(0, 1));
        } else {
            counterRepo.save(new Counter(0, counter.nextId() + 1));
        }
        return counter.nextId();
    }

}
