package com.rcbsukcesja.hack2react.exceptions.alreadyExists;

import com.rcbsukcesja.hack2react.exceptions.ApiRequestException;

public class EmailAlreadyExistsException extends ApiRequestException {

    public EmailAlreadyExistsException() {
    }

    public EmailAlreadyExistsException(String message) {
        super(message);
    }

    public EmailAlreadyExistsException(String message, Object...args) {
        super(String.format(message, args));
    }
}
