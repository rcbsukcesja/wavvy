package com.rcbsukcesja.hack2react.utils;

import com.rcbsukcesja.hack2react.exceptions.forbidden.ForbiddenAccessDeniedException;
import com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages;
import lombok.experimental.UtilityClass;
import org.springframework.security.core.Authentication;

@UtilityClass
public class AuthenticationUtils {

    public static boolean hasRole(Authentication authentication, String role) {
        return authentication.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals(role));
    }

    public static boolean isCityUser(Authentication authentication) {
        return hasRole(authentication, "ROLE_CITY_HALL");
    }

    public static void checkIfCityUser(Authentication authentication, String resource) {
        if (!isCityUser(authentication)) {
            throw new ForbiddenAccessDeniedException(ErrorMessages.FORBIDDEN_MODIFICATION, resource);
        }
    }
}
