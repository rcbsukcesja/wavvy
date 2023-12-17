package com.rcbsukcesja.hack2react.exceptions.badrequest;

import com.rcbsukcesja.hack2react.exceptions.ApiRequestException;

public class InvalidNipException extends ApiRequestException {

    public InvalidNipException() {
    }

    public InvalidNipException(String message) {
        super(message);
    }

    public InvalidNipException(String message, Object... args) {
        super(String.format(message, args));
    }
}
