package com.rcbsukcesja.hack2react.exceptions.badrequest;

import com.rcbsukcesja.hack2react.exceptions.ApiRequestException;

public class InvalidRegonException extends ApiRequestException {

    public InvalidRegonException() {
    }

    public InvalidRegonException(String message) {
        super(message);
    }

    public InvalidRegonException(String message, Object... args) {
        super(String.format(message, args));
    }
}
