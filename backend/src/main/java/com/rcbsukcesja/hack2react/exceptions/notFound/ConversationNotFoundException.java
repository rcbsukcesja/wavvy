package com.rcbsukcesja.hack2react.exceptions.notFound;

import com.rcbsukcesja.hack2react.exceptions.ApiRequestException;

public class ConversationNotFoundException extends ApiRequestException {

    public ConversationNotFoundException() {
    }

    public ConversationNotFoundException(String message) {
        super(message);
    }

    public ConversationNotFoundException(String message, Object...args) {
        super(String.format(message, args));
    }
}
