package com.rcbsukcesja.hack2react.exceptions.messages;

public class ErrorMessages {
    public static final String BUSINESS_AREA_NOT_FOUND = "Business Area with id %s not found!";
    public static final String BUSINESS_AREA_ALREADY_EXISTS = "Business Area with name %s already exists!";
    public static final String BUSINESS_AREA_ALREADY_ATTACHED_TO_ORGANIZATION = "Business Area with id %s already attached to organizations!";

    public static final String USER_NOT_FOUND = "User with id %s not found!";
    public static final String USERS_EMAIL_ALREADY_EXIST = "User's email %s already exist!";
    public static final String USERS_USERNAME_ALREADY_EXIST = "User's username %s already exist!";

    public static final String ORGANIZATION_NOT_FOUND = "Organization with id %s not found!";

    public static final String ORGANIZATION_NGO_NOT_FOUND = "Organization NGO with id %s not found!";

    public static final String ORGANIZATION_NGO_BY_OWNER_ID_NOT_FOUND = "Organization NGO with owner id %s not found!";
    public static final String ORGANIZATION_NAME_ALREADY_EXISTS = "Organization with name %s already exists";
    public static final String ORGANIZATION_NIP_ALREADY_EXISTS = "Organization with nip %s already exists";
    public static final String ORGANIZATION_KRS_ALREADY_EXISTS = "Organization with krs %s already exists";
    public static final String ORGANIZATION_REGON_ALREADY_EXISTS = "Organization with regon %s already exists";

    public static final String COMPANY_NOT_FOUND = "Company with id %s not found!";

    public static final String PROJECT_NOT_FOUND = "Project with id %s not found!";

    public static final String MESSAGE_NOT_FOUND = "Message with id %s not found!";

    public static final String OFFER_NOT_FOUND = "Offer with id %s not found!";
    public static final String FILE_IS_EMPTY = "Failed to store empty file!";
    public static final String FILE_IS_NOT_IMAGE = "File is not an image!";
    public static final String FILE_IS_TOO_LARGE = "File is too large! Maximum file size is %s";

    public static final String FILE_FAILED_TO_STORE = "Failed to store file!";
    public static final String FILE_EXTENSION_FAILURE = "Failed to store file! Extension cannot be null!";
    public static final String FILE_FAILED_TO_REMOVE = "Failed to remove file!";

    public static final String DATE_START_AFTER_END_VALIDATION_MESSAGE = "Start date cannot be after end date";
    public static final String OFFER_DATE_END_IN_PAST_VALIDATION_MESSAGE = "End date cannot be in the past";

    public static final String INVALID_ENUM_VALUE = "Could not find enum with value: %s";
    public static final String INVALID_ENUM_ID = "Could not find enum with id: %s";
    public static final String INVALID_ENUM_NAME = "Could not find enum: %s";

    public static final String INVALID_OFFER_SCOPE = "At least one requested offer scope is not allowed for this user";
    public static final String INVALID_OFFER_STATUS = "At least one requested offer status is not allowed for this user";
    public static final String INVALID_PROJECT_STATUS = "Requested project statuses are not allowed for this user";

    public static final String FOUNDED_AT_DATE_VALIDATION_MESSAGE = "Founded at date must be in the past";

    public static final String REASON_MUST_NOT_BE_NULL = "Reason must not be null when disabling NGO";

    public static final String FORBIDDEN_MODIFICATION = "Forbidden. You don't have permission to modify %s";
    public static String ACCESS_DENIED_MESSAGE = "Forbidden. You don't have access.";

}
