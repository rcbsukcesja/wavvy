package com.rcbsukcesja.hack2react.exceptions.notFound;

import com.rcbsukcesja.hack2react.exceptions.ApiRequestException;

public class UserNotFoundException extends ApiRequestException {

    public UserNotFoundException() {
    }

    public UserNotFoundException(String message) {
        super(message);
    }

    public UserNotFoundException(String message, Object...args) {
        super(String.format(message, args));
    }
}
