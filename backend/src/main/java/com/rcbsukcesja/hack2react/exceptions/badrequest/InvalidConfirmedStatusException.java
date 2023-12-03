package com.rcbsukcesja.hack2react.exceptions.badrequest;

import com.rcbsukcesja.hack2react.exceptions.ApiRequestException;

public class InvalidConfirmedStatusException extends ApiRequestException {

    public InvalidConfirmedStatusException() {
    }

    public InvalidConfirmedStatusException(String message) {
        super(message);
    }

    public InvalidConfirmedStatusException(String message, Object... args) {
        super(String.format(message, args));
    }
}
