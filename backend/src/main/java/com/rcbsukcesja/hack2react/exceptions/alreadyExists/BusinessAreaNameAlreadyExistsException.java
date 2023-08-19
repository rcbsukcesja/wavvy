package com.rcbsukcesja.hack2react.exceptions.alreadyExists;

import com.rcbsukcesja.hack2react.exceptions.ApiRequestException;

public class BusinessAreaNameAlreadyExistsException extends ApiRequestException {

    public BusinessAreaNameAlreadyExistsException() {
    }

    public BusinessAreaNameAlreadyExistsException(String message) {
        super(message);
    }

    public BusinessAreaNameAlreadyExistsException(String message, Object...args){
        super(String.format(message, args));
    }
}
