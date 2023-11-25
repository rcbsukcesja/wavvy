package com.rcbsukcesja.hack2react.model.dto.save;

import com.rcbsukcesja.hack2react.model.enums.LegalStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.Set;
import java.util.UUID;

import static com.rcbsukcesja.hack2react.validations.ValidationConstants.BANK_ACCOUNT;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.BANK_ACCOUNT_VALIDATION_MESSAGE;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.DESCRIPTION_MAX_LENGTH;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.KRS_PATTERN_VALIDATION_MESSAGE;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.KRS_REGEX;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.NGO_BUSINESS_AREAS_NOT_EMPTY_VALIDATION_MESSAGE;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.NIP_PATTERN_VALIDATION_MESSAGE;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.NIP_REGEX;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.NOT_BLANK_PATTERN;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.NOT_BLANK_VALIDATION_MESSAGE;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.PHONE_PATTERN_VALIDATION_MESSAGE;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.PHONE_REGEX;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.REGON_PATTERN_VALIDATION_MESSAGE;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.REGON_REGEX;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.RESOURCES_MAX_NUMBER;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.RESOURCES_MAX_NUMBER_VALIDATION_MESSAGE;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.STANDARD_TEXT_MAX_LENGTH;

@Builder
public record OrganizationNGOPatchDto(
        @Pattern(regexp = NOT_BLANK_PATTERN,
                message = NOT_BLANK_VALIDATION_MESSAGE)
        @Size(max = STANDARD_TEXT_MAX_LENGTH)
        String name,
        UUID ownerId,
        OrganizationAddressPatchDto address,
        @Pattern(regexp = PHONE_REGEX,
                message = PHONE_PATTERN_VALIDATION_MESSAGE)
        String phone,
        @Email
        @Size(max = STANDARD_TEXT_MAX_LENGTH)
        String email,
        @Size(max = STANDARD_TEXT_MAX_LENGTH)
        String website,
        Set<@Size(max = STANDARD_TEXT_MAX_LENGTH) String> socialLinks,
        @Size(max = DESCRIPTION_MAX_LENGTH)
        String description,
        @Size(min = 1, message = NGO_BUSINESS_AREAS_NOT_EMPTY_VALIDATION_MESSAGE)
        Set<UUID> businessAreaIds,
        @Pattern(regexp = KRS_REGEX, message = KRS_PATTERN_VALIDATION_MESSAGE)
        String krs,
        @Pattern(regexp = NIP_REGEX, message = NIP_PATTERN_VALIDATION_MESSAGE)
        String nip,
        @Pattern(regexp = REGON_REGEX, message = REGON_PATTERN_VALIDATION_MESSAGE)
        String regon,
        @Size(max = RESOURCES_MAX_NUMBER, message = RESOURCES_MAX_NUMBER_VALIDATION_MESSAGE)
        Set<@Size(max = STANDARD_TEXT_MAX_LENGTH) String> resources,
        LegalStatus legalStatus,
        @Pattern(regexp = BANK_ACCOUNT, message = BANK_ACCOUNT_VALIDATION_MESSAGE)
        String bankAccount,
        Set<@Size(max = STANDARD_TEXT_MAX_LENGTH) String> tags,
        LocalDate foundetAtDate
) {

}
