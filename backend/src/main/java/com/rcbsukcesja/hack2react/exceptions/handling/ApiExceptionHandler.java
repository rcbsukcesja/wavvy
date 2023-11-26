package com.rcbsukcesja.hack2react.exceptions.handling;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.rcbsukcesja.hack2react.exceptions.ApiRequestException;
import com.rcbsukcesja.hack2react.exceptions.alreadyExists.BusinessAreaNameAlreadyExistsException;
import com.rcbsukcesja.hack2react.exceptions.alreadyExists.CompanyAlreadyExistsException;
import com.rcbsukcesja.hack2react.exceptions.alreadyExists.EmailAlreadyExistsException;
import com.rcbsukcesja.hack2react.exceptions.alreadyExists.OrganizationAlreadyExistsException;
import com.rcbsukcesja.hack2react.exceptions.alreadyExists.OrganizationsAlreadyAttachedToBusinessAreaException;
import com.rcbsukcesja.hack2react.exceptions.alreadyExists.UsernameAlreadyExistsException;
import com.rcbsukcesja.hack2react.exceptions.badrequest.InvalidDateRangeException;
import com.rcbsukcesja.hack2react.exceptions.badrequest.InvalidEnumParameterException;
import com.rcbsukcesja.hack2react.exceptions.badrequest.InvalidFileException;
import com.rcbsukcesja.hack2react.exceptions.badrequest.InvalidOfferScopeException;
import com.rcbsukcesja.hack2react.exceptions.badrequest.InvalidProjectStatusException;
import com.rcbsukcesja.hack2react.exceptions.notFound.BusinessAreaNotFoundException;
import com.rcbsukcesja.hack2react.exceptions.notFound.CompanyNotFoundException;
import com.rcbsukcesja.hack2react.exceptions.notFound.MessageNotFoundException;
import com.rcbsukcesja.hack2react.exceptions.notFound.OrganizationNGONotFoundException;
import com.rcbsukcesja.hack2react.exceptions.notFound.OrganizationNotFoundException;
import com.rcbsukcesja.hack2react.exceptions.notFound.ProjectNotFoundException;
import com.rcbsukcesja.hack2react.exceptions.notFound.UserNotFoundException;
import com.rcbsukcesja.hack2react.utils.TimeUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(value = {
            UserNotFoundException.class,
            BusinessAreaNotFoundException.class,
            MessageNotFoundException.class,
            OrganizationNotFoundException.class,
            OrganizationNGONotFoundException.class,
            CompanyNotFoundException.class,
            ProjectNotFoundException.class})
    public ResponseEntity<Object> handleNotFoundTypeException(ApiRequestException e) {

        ApiException apiException = new ApiException(
                e.getMessage(),
                HttpStatus.NOT_FOUND,
                TimeUtils.nowInZone()
        );
        return new ResponseEntity<>(apiException, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = {
            EmailAlreadyExistsException.class,
            UsernameAlreadyExistsException.class,
            BusinessAreaNameAlreadyExistsException.class,
            OrganizationAlreadyExistsException.class,
            CompanyAlreadyExistsException.class,
            InvalidFileException.class,
            InvalidDateRangeException.class,
            OrganizationsAlreadyAttachedToBusinessAreaException.class,
            InvalidEnumParameterException.class,
            InvalidOfferScopeException.class,
            InvalidProjectStatusException.class
    })
    public ResponseEntity<Object> handleBadRequestTypeException(ApiRequestException e) {

        ApiException apiException = new ApiException(
                e.getMessage(),
                HttpStatus.BAD_REQUEST,
                TimeUtils.nowInZone()
        );
        return new ResponseEntity<>(apiException, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleValidationException(MethodArgumentNotValidException e) {
        List<String> details = e.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .toList();
        String message = "Validation failed for fields: " + details;
        ApiException apiException = new ApiException(
                message,
                HttpStatus.BAD_REQUEST,
                TimeUtils.nowInZone()
        );
        return new ResponseEntity<>(apiException, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(JsonMappingException.class)
    public ResponseEntity<Object> handleJsonMappingException(JsonMappingException e) {
        ApiException apiException = new ApiException(
                e.getMessage(),
                HttpStatus.BAD_REQUEST,
                TimeUtils.nowInZone()
        );
        return new ResponseEntity<>(apiException, HttpStatus.BAD_REQUEST);
    }

}
