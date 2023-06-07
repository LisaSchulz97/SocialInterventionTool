package com.example.backend.security;

import com.example.backend.organization.service.IdService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class MongoUserDetailsService implements UserDetailsService {

    private final MongoUserRepository mongoUserRepository;
    private final IdService idService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        MongoUser mongoUser = findMongoUserByUsername(username);

        return User.builder()
                .username(mongoUser.username())
                .password(mongoUser.password())
                .roles(mongoUser.role().toString()).build();
    }

    public MongoUser findMongoUserByUsername(String username) {
        return mongoUserRepository.findMongoUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User with name: " + username + " not found!"));
    }

    public MongoUser getAuthenticatedUser () {
        return findMongoUserByUsername(
                SecurityContextHolder.getContext().getAuthentication().getName()
        );
    }

    public MongoUser saveUser(MongoUser user) {
        String newId = idService.createId();
        MongoUser newUser = new MongoUser(
                newId,
                user.username(),
                Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8().encode(user.password()),
                Role.BASIC
        );
        return mongoUserRepository.save(newUser);
    }
}
