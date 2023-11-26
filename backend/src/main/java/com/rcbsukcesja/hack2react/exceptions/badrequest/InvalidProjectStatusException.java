package com.rcbsukcesja.hack2react.exceptions.badrequest;

import com.rcbsukcesja.hack2react.exceptions.ApiRequestException;

public class InvalidProjectStatusException extends ApiRequestException {

    public InvalidProjectStatusException() {
    }

    public InvalidProjectStatusException(String message) {
        super(message);
    }

    public InvalidProjectStatusException(String message, Object... args) {
        super(String.format(message, args));
    }
}
