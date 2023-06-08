package com.example.backend.questionnaire.counter;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CounterService {

    private final CounterRepo counterRepo;

    public int nextId(String userId) {
        Counter counter = counterRepo.findById(userId).orElseThrow();
        if (counter.nextId() == 99) {
            counterRepo.save(new Counter(userId, 1));
        } else {
            counterRepo.save(new Counter(userId, counter.nextId() + 1));
        }
        return counter.nextId();
    }

    public void save(Counter counter) {
        counterRepo.save(counter);
    }

}
