package com.rcbsukcesja.hack2react.exceptions.notFound;

import com.rcbsukcesja.hack2react.exceptions.ApiRequestException;

public class OrganizationNGONotFoundException extends ApiRequestException {

    public OrganizationNGONotFoundException() {
    }

    public OrganizationNGONotFoundException(String message) {
        super(message);
    }

    public OrganizationNGONotFoundException(String message, Object...args) {
        super(String.format(message, args));
    }
}
