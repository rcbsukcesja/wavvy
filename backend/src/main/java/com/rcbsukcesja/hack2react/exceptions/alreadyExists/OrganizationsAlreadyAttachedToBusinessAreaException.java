package com.rcbsukcesja.hack2react.exceptions.alreadyExists;

import com.rcbsukcesja.hack2react.exceptions.ApiRequestException;

public class OrganizationsAlreadyAttachedToBusinessAreaException extends ApiRequestException {

    public OrganizationsAlreadyAttachedToBusinessAreaException() {
    }

    public OrganizationsAlreadyAttachedToBusinessAreaException(String message) {
        super(message);
    }

    public OrganizationsAlreadyAttachedToBusinessAreaException(String message, Object... args) {
        super(String.format(message, args));
    }
}
