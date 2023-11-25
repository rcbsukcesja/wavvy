package com.rcbsukcesja.hack2react.exceptions.badrequest;

import com.rcbsukcesja.hack2react.exceptions.ApiRequestException;

public class InvalidFoundedAtDateException extends ApiRequestException {

    public InvalidFoundedAtDateException() {
    }

    public InvalidFoundedAtDateException(String message) {
        super(message);
    }

    public InvalidFoundedAtDateException(String message, Object... args) {
        super(String.format(message, args));
    }
}
