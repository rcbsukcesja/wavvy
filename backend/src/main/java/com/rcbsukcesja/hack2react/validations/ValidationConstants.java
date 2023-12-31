package com.rcbsukcesja.hack2react.validations;

import java.util.regex.Pattern;

public interface ValidationConstants {

    int STANDARD_TEXT_MAX_LENGTH = 255;
    int DESCRIPTION_MAX_LENGTH = 2000;
    int REASON_MAX_LENGTH =2000;
    int RESOURCES_MAX_NUMBER = 20;
    int MESSAGE_MAX_LENGTH =2000;

    int NGO_TAG_MIN = 3;
    int NGO_TAG_MAX = 12;
    int PROJECT_TAG_MIN = 1;
    int PROJECT_TAG_MAX =5;
    String PHONE_REGEX = "^\\d{9}$";
    String REGON_REGEX = "^(\\s*|\\d{9}|\\d{14})$";
    String NIP_REGEX = "^\\s*|\\d{10}$";
    String KRS_REGEX = "^\\s*|\\d{10}$";

    Pattern patternRegon = Pattern.compile(REGON_REGEX);
    Pattern patternNip = Pattern.compile(NIP_REGEX);
    Pattern patternKrs = Pattern.compile(KRS_REGEX);

    String NOT_BLANK_PATTERN = "^(?!\\s*$).+";

    String BANK_ACCOUNT = "^(\\s*|\\d{26})$";

    String ZIP_CODE_REGEX = "^[0-9]{2}-[0-9]{3}$";

    String NOT_BLANK_VALIDATION_MESSAGE = "Field cannot be blank";
    String PHONE_PATTERN_VALIDATION_MESSAGE = "Phone number should have 9 digits";
    String REGON_PATTERN_VALIDATION_MESSAGE = "REGON should have 9 or 14 digits";
    String NIP_PATTERN_VALIDATION_MESSAGE = "NIP should have 10 digits";
    String KRS_PATTERN_VALIDATION_MESSAGE = "KRS should have 10 digits";
    String NGO_BUSINESS_AREAS_NOT_EMPTY_VALIDATION_MESSAGE = "Business area ids cannot be empty";

    String BANK_ACCOUNT_VALIDATION_MESSAGE = "Bank account should have 26 digits";

    String ZIP_CODE_VALIDATION_MESSAGE = "Zip code should have 5 digits and be in format XX-XXX";

    String RESOURCES_MAX_NUMBER_VALIDATION_MESSAGE = "Resources number should be less than {max}";

    String PROJECT_TAGS_VALIDATION_MESSAGE = "Project tags number should be between {min} and {max}";
    String NGO_TAGS_VALIDATION_MESSAGE = "NGO tags number should be between {min} and {max}";
}
