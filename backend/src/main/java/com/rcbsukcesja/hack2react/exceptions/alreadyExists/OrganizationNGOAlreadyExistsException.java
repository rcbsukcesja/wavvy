package com.rcbsukcesja.hack2react.exceptions.alreadyExists;

import com.rcbsukcesja.hack2react.exceptions.ApiRequestException;

public class OrganizationNGOAlreadyExistsException extends ApiRequestException {

    public OrganizationNGOAlreadyExistsException() {
    }

    public OrganizationNGOAlreadyExistsException(String message) {
        super(message);
    }

    public OrganizationNGOAlreadyExistsException(String message, Object...args) {
        super(String.format(message, args));
    }
}
