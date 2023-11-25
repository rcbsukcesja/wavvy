package com.rcbsukcesja.hack2react.exceptions.badrequest;

import com.rcbsukcesja.hack2react.exceptions.ApiRequestException;

public class InvalidFoundetAtDateException extends ApiRequestException {

    public InvalidFoundetAtDateException() {
    }

    public InvalidFoundetAtDateException(String message) {
        super(message);
    }

    public InvalidFoundetAtDateException(String message, Object... args) {
        super(String.format(message, args));
    }
}
