package com.rcbsukcesja.hack2react.validations;

import com.rcbsukcesja.hack2react.exceptions.forbidden.ForbiddenAccessDeniedException;
import com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages;
import com.rcbsukcesja.hack2react.utils.TokenUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class UserValidation {

    public void checkIfIsOwner(UUID id){
        UUID loggedUserId =TokenUtils.getUserId(SecurityContextHolder.getContext()
                .getAuthentication());

        if(!id.equals(loggedUserId))
            throw new ForbiddenAccessDeniedException(ErrorMessages.ACCESS_DENIED_MESSAGE);

    }
}
