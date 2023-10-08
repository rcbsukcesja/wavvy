package com.rcbsukcesja.hack2react.exceptions.notFound;

import com.rcbsukcesja.hack2react.exceptions.ApiRequestException;

public class CompanyNotFoundException extends ApiRequestException {

    public CompanyNotFoundException() {
    }

    public CompanyNotFoundException(String message) {
        super(message);
    }

    public CompanyNotFoundException(String message, Object... args) {
        super(String.format(message, args));
    }
}
