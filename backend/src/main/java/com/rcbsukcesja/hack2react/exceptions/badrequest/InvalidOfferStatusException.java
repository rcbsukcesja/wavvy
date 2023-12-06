package com.rcbsukcesja.hack2react.exceptions.badrequest;

import com.rcbsukcesja.hack2react.exceptions.ApiRequestException;

public class InvalidOfferStatusException extends ApiRequestException {

    public InvalidOfferStatusException() {
    }

    public InvalidOfferStatusException(String message) {
        super(message);
    }

    public InvalidOfferStatusException(String message, Object... args) {
        super(String.format(message, args));
    }
}
