package com.rcbsukcesja.hack2react.exceptions.messages;

public class ErrorMessages {
    public static final String BUSINESS_AREA_NOT_FOUND = "Business Area with id %s not found!";
    public static final String BUSINESS_AREA_ALREADY_EXISTS = "Business Area with name %s already exists!";

    public static final String USER_NOT_FOUND = "User with id %s not found!";
    public static final String USERS_EMAIL_ALREADY_EXIST = "User's email %s already exist!";
    public static final String USERS_USERNAME_ALREADY_EXIST = "User's username %s already exist!";

    public static final String ORGANIZATION_NGO_NOT_FOUND = "Organization NGO with id %s not found!";
    public static final String ORGANIZATION_NGO_NAME_ALREADY_EXISTS = "Organization NGO with name %s already exists";
    public static final String ORGANIZATION_NGO_NIP_ALREADY_EXISTS = "Organization NGO with nip %s already exists";
    public static final String ORGANIZATION_NGO_KRS_ALREADY_EXISTS = "Organization NGO with krs %s already exists";
    public static final String ORGANIZATION_NGO_REGON_ALREADY_EXISTS = "Organization NGO with regon %s already exists";

    public static final String COMPANY_NOT_FOUND = "Company with id %s not found!";
    public static final String COMPANY_NAME_ALREADY_EXISTS = "Company with name %s already exists";
    public static final String COMPANY_NIP_ALREADY_EXISTS = "Company NGO with nip %s already exists";
    public static final String COMPANY_KRS_ALREADY_EXISTS = "Company NGO with krs %s already exists";
    public static final String COMPANY_REGON_ALREADY_EXISTS = "Company NGO with regon %s already exists";

    public static final String PROJECT_NOT_FOUND = "Project with id %s not found!";

    public static final String MESSAGE_NOT_FOUND = "Message with id %s not found!";

    public static final String OFFER_NOT_FOUND = "Offer with id %s not found!";

    public static final String CONVERSATION_NOT_FOUND = "Conversation with id %s not found!";

    public static final String FILE_IS_EMPTY = "Failed to store empty file!";
    public static final String FILE_IS_NOT_IMAGE = "File is not an image!";

    public static final String FILE_FAILED_TO_STORE = "Failed to store file!";
    public static final String FILE_FAILED_TO_REMOVE = "Failed to remove file!";

    public static final String OFFER_DATE_START_AFTER_END_VALIDATION_MESSAGE = "Start date cannot be after end date";
    public static final String OFFER_DATE_END_IN_PAST_VALIDATION_MESSAGE = "End date cannot be in the past";
}
