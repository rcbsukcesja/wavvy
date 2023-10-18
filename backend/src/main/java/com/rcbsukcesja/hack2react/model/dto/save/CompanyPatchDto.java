package com.rcbsukcesja.hack2react.model.dto.save;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import java.util.Set;
import java.util.UUID;

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
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.STANDARD_TEXT_MAX_LENGTH;

@Builder
public record CompanyPatchDto(
        @Pattern(regexp = NOT_BLANK_PATTERN,
                message = NOT_BLANK_VALIDATION_MESSAGE)
        @Size(max = STANDARD_TEXT_MAX_LENGTH)
        String name,
        UUID ownerId,
        @Pattern(regexp = NOT_BLANK_PATTERN,
                message = NOT_BLANK_VALIDATION_MESSAGE)
        @Size(max = STANDARD_TEXT_MAX_LENGTH)
        String address,
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
        Set<@Size(max = STANDARD_TEXT_MAX_LENGTH) String> resources
) {

}
