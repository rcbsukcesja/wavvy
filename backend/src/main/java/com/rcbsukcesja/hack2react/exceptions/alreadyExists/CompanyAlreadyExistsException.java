package com.rcbsukcesja.hack2react.exceptions.alreadyExists;

import com.rcbsukcesja.hack2react.exceptions.ApiRequestException;

public class CompanyAlreadyExistsException extends ApiRequestException {

    public CompanyAlreadyExistsException() {
    }

    public CompanyAlreadyExistsException(String message) {
        super(message);
    }

    public CompanyAlreadyExistsException(String message, Object... args) {
        super(String.format(message, args));
    }
}
