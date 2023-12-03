package com.rcbsukcesja.hack2react.utils;

import lombok.experimental.UtilityClass;
import org.springframework.security.core.context.SecurityContextHolder;

@UtilityClass
public class ConfirmedStatusUtils {

    public static boolean checkUserCanChangeFields(Boolean confirmedStatus) {
        boolean result;
        boolean isCityUser = AuthenticationUtils.isCityUser(SecurityContextHolder.getContext().getAuthentication());
        if (isCityUser) {
            result = true;
        } else {
            result = !Boolean.TRUE.equals(confirmedStatus);
        }
        return result;
    }
}
