package com.rcbsukcesja.hack2react.exceptions.handling;

import com.rcbsukcesja.hack2react.exceptions.ApiRequestException;
import com.rcbsukcesja.hack2react.exceptions.alreadyExists.BusinessAreaNameAlreadyExistsException;
import com.rcbsukcesja.hack2react.exceptions.alreadyExists.EmailAlreadyExistsException;
import com.rcbsukcesja.hack2react.exceptions.alreadyExists.OrganizationNGOAlreadyExistsException;
import com.rcbsukcesja.hack2react.exceptions.alreadyExists.UsernameAlreadyExistsException;
import com.rcbsukcesja.hack2react.exceptions.notFound.BusinessAreaNotFoundException;
import com.rcbsukcesja.hack2react.exceptions.notFound.MessageNotFoundException;
import com.rcbsukcesja.hack2react.exceptions.notFound.OrganizationNGONotFoundException;
import com.rcbsukcesja.hack2react.exceptions.notFound.ProjectNotFoundException;
import com.rcbsukcesja.hack2react.exceptions.notFound.UserNotFoundException;
import com.rcbsukcesja.hack2react.utils.TimeUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(value = {
            UserNotFoundException.class,
            BusinessAreaNotFoundException.class,
            MessageNotFoundException.class,
            OrganizationNGONotFoundException.class,
            ProjectNotFoundException.class})
    public ResponseEntity<Object> handleNotFoundTypeException(ApiRequestException e) {

        ApiException apiException = new ApiException(
                e.getMessage(),
                HttpStatus.NOT_FOUND,
                TimeUtils.now()
        );
        return new ResponseEntity<>(apiException, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = {
            EmailAlreadyExistsException.class,
            UsernameAlreadyExistsException.class,
            BusinessAreaNameAlreadyExistsException.class,
            OrganizationNGOAlreadyExistsException.class})
    public ResponseEntity<Object> handleBadRequestTypeException(ApiRequestException e) {

        ApiException apiException = new ApiException(
                e.getMessage(),
                HttpStatus.BAD_REQUEST,
                TimeUtils.now()
        );
        return new ResponseEntity<>(apiException, HttpStatus.BAD_REQUEST);
    }
}
