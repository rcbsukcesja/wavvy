package com.rcbsukcesja.hack2react.exceptions.io;

import com.rcbsukcesja.hack2react.exceptions.ApiRequestException;

public class StorageException extends ApiRequestException {

    public StorageException() {
    }

    public StorageException(String message) {
        super(message);
    }

    public StorageException(String message, Object... args) {
        super(String.format(message, args));
    }
}
