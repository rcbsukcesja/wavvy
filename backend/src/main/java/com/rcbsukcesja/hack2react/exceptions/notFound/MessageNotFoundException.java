package com.rcbsukcesja.hack2react.exceptions.notFound;

import com.rcbsukcesja.hack2react.exceptions.ApiRequestException;

public class MessageNotFoundException extends ApiRequestException {

    public MessageNotFoundException() {
    }

    public MessageNotFoundException(String message) {
        super(message);
    }

    public MessageNotFoundException(String message, Object...args) {
        super(String.format(message, args));
    }
}
