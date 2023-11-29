package com.rcbsukcesja.hack2react.model.dto.save;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import static com.rcbsukcesja.hack2react.validations.ValidationConstants.STANDARD_TEXT_MAX_LENGTH;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.ZIP_CODE_REGEX;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.ZIP_CODE_VALIDATION_MESSAGE;

@Builder
public record OrganizationAddressSaveDto(

        @Size(max = STANDARD_TEXT_MAX_LENGTH)
        String street,

        @Size(max = STANDARD_TEXT_MAX_LENGTH)
        String city,

        @Pattern(regexp = ZIP_CODE_REGEX, message = ZIP_CODE_VALIDATION_MESSAGE)
        String zipCode,

        @Size(max = STANDARD_TEXT_MAX_LENGTH)
        String country
) {

}
