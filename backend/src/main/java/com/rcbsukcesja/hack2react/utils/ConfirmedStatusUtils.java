package com.rcbsukcesja.hack2react.utils;

import lombok.experimental.UtilityClass;
import org.springframework.security.core.context.SecurityContextHolder;

@UtilityClass
public class ConfirmedStatusUtils {

    public static boolean checkUserCanChangeFields(boolean confirmedStatus) {
        if (AuthenticationUtils.isCityUser(SecurityContextHolder.getContext().getAuthentication())) {
            return  true;
        }
        return !confirmedStatus;
    }
}
