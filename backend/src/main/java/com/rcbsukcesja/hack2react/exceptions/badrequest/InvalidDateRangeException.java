package com.rcbsukcesja.hack2react.exceptions.badrequest;

import com.rcbsukcesja.hack2react.exceptions.ApiRequestException;

public class InvalidDateRangeException extends ApiRequestException {

    public InvalidDateRangeException() {
    }

    public InvalidDateRangeException(String message) {
        super(message);
    }

    public InvalidDateRangeException(String message, Object... args) {
        super(String.format(message, args));
    }
}
