package com.rcbsukcesja.hack2react.exceptions.alreadyExists;

import com.rcbsukcesja.hack2react.exceptions.ApiRequestException;

public class OrganizationAlreadyExistsException extends ApiRequestException {

    public OrganizationAlreadyExistsException() {
    }

    public OrganizationAlreadyExistsException(String message) {
        super(message);
    }

    public OrganizationAlreadyExistsException(String message, Object... args) {
        super(String.format(message, args));
    }
}
