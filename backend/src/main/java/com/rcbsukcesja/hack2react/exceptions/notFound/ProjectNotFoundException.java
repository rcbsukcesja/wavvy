package com.rcbsukcesja.hack2react.exceptions.notFound;

import com.rcbsukcesja.hack2react.exceptions.ApiRequestException;

public class ProjectNotFoundException extends ApiRequestException {

    public ProjectNotFoundException() {
    }

    public ProjectNotFoundException(String message) {
        super(message);
    }

    public ProjectNotFoundException(String message, Object...args) {
        super(String.format(message, args));
    }
}
