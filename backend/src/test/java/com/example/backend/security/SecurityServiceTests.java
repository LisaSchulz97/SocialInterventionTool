package com.example.backend.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import java.util.Optional;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.catchException;
import static org.mockito.Mockito.*;

class SecurityServiceTests {
    private final MongoUserRepository mongoUserRepository = mock(MongoUserRepository.class);
    private final MongoUserDetailsService mongoUserDetailsService = new MongoUserDetailsService(mongoUserRepository);
    private MongoUser mongoUser;


    @BeforeEach
    void setUp() {
        mongoUser = new MongoUser("564", "Carina", "Carina1", Role.ADMIN);
    }

    @Test
    void findMongoUserByUsernameWhenUserExists() {
        //Given
        when(mongoUserRepository.findMongoUserByUsername(mongoUser.username()))
                .thenReturn(Optional.ofNullable(mongoUser));

        // When
        MongoUser actual = mongoUserDetailsService.findMongoUserByUsername(mongoUser.username());

        // Then
        verify(mongoUserRepository).findMongoUserByUsername(mongoUser.username());
        assertThat(actual).isEqualTo(mongoUser);
    }

    @Test
    void throwUsernameNotFoundExceptionWhenUsernameDoesntExists() {
        //Given
        when(mongoUserRepository.findMongoUserByUsername("false-username"))
                .thenReturn(Optional.empty());

        //When
        Exception actual = catchException(() -> mongoUserDetailsService.findMongoUserByUsername("false-username"));
        UsernameNotFoundException expected = new UsernameNotFoundException("User not found!");

        //Then
        verify(mongoUserRepository).findMongoUserByUsername("false-username");
        assertThat(actual).isInstanceOf(expected.getClass()).hasMessageContaining("false-username");
    }
}
