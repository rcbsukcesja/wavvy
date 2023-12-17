package com.rcbsukcesja.hack2react.exceptions.badrequest;

import com.rcbsukcesja.hack2react.exceptions.ApiRequestException;

public class InvalidKrsException extends ApiRequestException {

    public InvalidKrsException() {
    }

    public InvalidKrsException(String message) {
        super(message);
    }

    public InvalidKrsException(String message, Object... args) {
        super(String.format(message, args));
    }
}
