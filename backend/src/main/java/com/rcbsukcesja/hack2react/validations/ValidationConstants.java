package com.rcbsukcesja.hack2react.validations;

public interface ValidationConstants {

    int STANDARD_TEXT_MAX_LENGTH = 255;
    int DESCRIPTION_MAX_LENGTH = 2000;
    String PHONE_REGEX = "^\\d{9}$";
    String REGON_REGEX = "^(\\d{9}|\\d{14})$";
    String NIP_REGEX = "^\\d{10}$";
    String KRS_REGEX = "^\\d{10}$";
    String NOT_BLANK_PATTERN = "^(?!\\s*$).+";

    String NOT_BLANK_VALIDATION_MESSAGE = "Field cannot be blank";
    String PHONE_PATTERN_VALIDATION_MESSAGE = "Phone number should have 9 digits";
    String REGON_PATTERN_VALIDATION_MESSAGE = "REGON should have 9 or 14 digits";
    String NIP_PATTERN_VALIDATION_MESSAGE = "NIP should have 10 digits";
    String KRS_PATTERN_VALIDATION_MESSAGE = "KRS should have 10 digits";
    String NGO_BUSINESS_AREAS_NOT_EMPTY_VALIDATION_MESSAGE = "Business area ids cannot be empty";
}
