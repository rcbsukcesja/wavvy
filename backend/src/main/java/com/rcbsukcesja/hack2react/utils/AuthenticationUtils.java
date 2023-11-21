package com.rcbsukcesja.hack2react.utils;

import lombok.experimental.UtilityClass;
import org.springframework.security.core.Authentication;

@UtilityClass
public class AuthenticationUtils {

    public static boolean hasRole(Authentication authentication, String role) {
        return authentication.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals(role));
    }
}
