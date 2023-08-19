package com.rcbsukcesja.hack2react.exceptions.alreadyExists;

import com.rcbsukcesja.hack2react.exceptions.ApiRequestException;

public class UsernameAlreadyExistsException extends ApiRequestException {

    public UsernameAlreadyExistsException() {
    }

    public UsernameAlreadyExistsException(String message) {
        super(message);
    }

    public UsernameAlreadyExistsException(String message, Object...args) {
        super(String.format(message, args));
    }
}
