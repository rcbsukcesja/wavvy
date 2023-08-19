package com.rcbsukcesja.hack2react.exceptions;

public class ApiRequestException extends RuntimeException {

    public ApiRequestException(){}

    public ApiRequestException(String message){
        super(message);
    }

    public ApiRequestException(String message, Object...args){
        super(String.format(message, args));
    }
}
