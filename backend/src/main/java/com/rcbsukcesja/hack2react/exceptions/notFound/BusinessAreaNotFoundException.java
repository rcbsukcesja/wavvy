package com.rcbsukcesja.hack2react.exceptions.notFound;

import com.rcbsukcesja.hack2react.exceptions.ApiRequestException;

public class BusinessAreaNotFoundException extends ApiRequestException {

    public BusinessAreaNotFoundException() {
    }

    public BusinessAreaNotFoundException(String message) {
        super(message);
    }

    public BusinessAreaNotFoundException(String message, Object...args) {
        super(String.format(message, args));
    }
}
