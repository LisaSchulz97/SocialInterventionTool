package com.example.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        CsrfTokenRequestAttributeHandler requestHandler = new CsrfTokenRequestAttributeHandler();
        requestHandler.setCsrfRequestAttributeName(null);
        String organizationPath = "/api/organization/**";
        String questionnairePath = "/api/questionnaire/**";

        return http
                .csrf(csrf -> csrf
                        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                        .csrfTokenRequestHandler(requestHandler))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
                .httpBasic()
                .authenticationEntryPoint(
                        (request, response, authException) -> response.sendError(
                                HttpStatus.UNAUTHORIZED.value(),
                                HttpStatus.UNAUTHORIZED.getReasonPhrase()
                        )
                ).and()
                .authorizeHttpRequests()
                .requestMatchers(HttpMethod.DELETE, organizationPath).hasRole(Role.ADMIN.toString())
                .requestMatchers(HttpMethod.POST, organizationPath).hasRole(Role.ADMIN.toString())
                .requestMatchers(HttpMethod.PUT, organizationPath).hasRole(Role.ADMIN.toString())
                .requestMatchers(HttpMethod.GET, organizationPath).hasAnyRole("BASIC", "ADMIN")
                .requestMatchers(HttpMethod.GET, questionnairePath).hasAnyRole("BASIC", "ADMIN")
                .anyRequest().permitAll().and()
                .build();
    }
}
