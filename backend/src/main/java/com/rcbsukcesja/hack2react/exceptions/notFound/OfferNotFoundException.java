package com.rcbsukcesja.hack2react.exceptions.notFound;

import com.rcbsukcesja.hack2react.exceptions.ApiRequestException;

public class OfferNotFoundException extends ApiRequestException {

    public OfferNotFoundException() {
    }

    public OfferNotFoundException(String message) {
        super(message);
    }

    public OfferNotFoundException(String message, Object...args) {
        super(String.format(message, args));
    }
}
