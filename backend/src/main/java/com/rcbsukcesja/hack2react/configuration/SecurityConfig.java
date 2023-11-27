package com.rcbsukcesja.hack2react.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

//    @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
//    public String issuerUri;

    @Bean
    public AuthorityConverter authorityConverter() {
        return new AuthorityConverter();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html")
                        .permitAll()
                        .requestMatchers(HttpMethod.POST, "/messages")
                        .permitAll()
                        //.requestMatchers(HttpMethod.GET, "/offers", "/ngos", "/projects", "/companies")
                        //.permitAll()
                        //.requestMatchers(HttpMethod.PATCH, "/projects/**/like")
                        //.permitAll()
                        .anyRequest()
                        .authenticated())
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .oauth2ResourceServer(oauth2 -> oauth2.jwt(authority -> authority
                        .jwtAuthenticationConverter(jwtAuthenticationConverter())));
        return http.build();
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtAuthenticationConverter jwtConverter = new JwtAuthenticationConverter();
        jwtConverter.setJwtGrantedAuthoritiesConverter(authorityConverter());
        return jwtConverter;
    }

//    @Bean
//    public JwtDecoder jwtDecoder(){
//        return JwtDecoders.fromIssuerLocation(issuerUri);
//    }

}
