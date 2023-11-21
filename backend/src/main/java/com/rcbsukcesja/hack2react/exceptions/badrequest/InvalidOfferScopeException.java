package com.rcbsukcesja.hack2react.exceptions.badrequest;

import com.rcbsukcesja.hack2react.exceptions.ApiRequestException;

public class InvalidOfferScopeException extends ApiRequestException {

    public InvalidOfferScopeException() {
    }

    public InvalidOfferScopeException(String message) {
        super(message);
    }

    public InvalidOfferScopeException(String message, Object... args) {
        super(String.format(message, args));
    }
}
