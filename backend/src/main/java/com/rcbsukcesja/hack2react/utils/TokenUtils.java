package com.rcbsukcesja.hack2react.utils;

import lombok.experimental.UtilityClass;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.util.Map;
import java.util.UUID;

@UtilityClass
public class TokenUtils {

    public static UUID getUserId(Authentication authentication) {
        if (authentication instanceof JwtAuthenticationToken jwtAuthentication) {
            Map<String, Object> claims = jwtAuthentication.getToken().getClaims();
            return UUID.fromString((String) claims.get("sub"));
        }
        return null;
    }

}
