package com.rcbsukcesja.hack2react.exceptions.forbidden;

import com.rcbsukcesja.hack2react.exceptions.ApiRequestException;

public class ForbiddenAccessDeniedException extends ApiRequestException {

    public ForbiddenAccessDeniedException() {
    }

    public ForbiddenAccessDeniedException(String message) {
        super(message);
    }

    public ForbiddenAccessDeniedException(String message, Object...args) {
        super(String.format(message, args));
    }
}
