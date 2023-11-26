package com.rcbsukcesja.hack2react.exceptions.badrequest;

import com.rcbsukcesja.hack2react.exceptions.ApiRequestException;

public class ReasonValueException extends ApiRequestException {

    public ReasonValueException() {
    }

    public ReasonValueException(String message) {
        super(message);
    }

    public ReasonValueException(String message, Object... args) {
        super(String.format(message, args));
    }
}
