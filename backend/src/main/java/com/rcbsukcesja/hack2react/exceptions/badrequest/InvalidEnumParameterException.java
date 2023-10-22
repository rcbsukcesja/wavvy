package com.rcbsukcesja.hack2react.exceptions.badrequest;

import com.rcbsukcesja.hack2react.exceptions.ApiRequestException;

public class InvalidEnumParameterException extends ApiRequestException {

    public InvalidEnumParameterException() {
    }

    public InvalidEnumParameterException(String message) {
        super(message);
    }

    public InvalidEnumParameterException(String message, Object... args) {
        super(String.format(message, args));
    }
}
