package com.rcbsukcesja.hack2react.configuration;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;
import java.util.stream.Collectors;

public class AuthorityConverter implements Converter<Jwt, Collection<GrantedAuthority>> {

    public Collection<GrantedAuthority> convert(Jwt jwt) {
        Map<String, Object> resourceAccess = jwt.getClaim("resource_access");
        if (resourceAccess.containsKey("wavvy-backend")) {
            Map<String, Object> wavvyBackend = (Map<String, Object>) resourceAccess.get("wavvy-backend");
            Collection<String> roles = (Collection<String>) wavvyBackend.get("roles");
            return roles.stream()
                    .map(roleName -> new SimpleGrantedAuthority("ROLE_" + roleName.toUpperCase()))
                    .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }
}
