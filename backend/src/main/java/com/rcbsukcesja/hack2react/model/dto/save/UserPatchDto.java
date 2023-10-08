package com.rcbsukcesja.hack2react.model.dto.save;

import com.rcbsukcesja.hack2react.model.enums.UserType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import org.hibernate.validator.constraints.Length;

import static com.rcbsukcesja.hack2react.validations.ValidationConstants.NOT_BLANK_PATTERN;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.NOT_BLANK_VALIDATION_MESSAGE;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.STANDARD_TEXT_MAX_LENGTH;

@Builder
public record UserPatchDto(
        @Pattern(regexp = NOT_BLANK_PATTERN, message = NOT_BLANK_VALIDATION_MESSAGE)
        @Length(max = STANDARD_TEXT_MAX_LENGTH)
        String username,
        @Pattern(regexp = NOT_BLANK_PATTERN, message = NOT_BLANK_VALIDATION_MESSAGE)
        @Length(max = STANDARD_TEXT_MAX_LENGTH)
        String firstName,
        @Pattern(regexp = NOT_BLANK_PATTERN, message = NOT_BLANK_VALIDATION_MESSAGE)
        @Length(max = STANDARD_TEXT_MAX_LENGTH)
        String lastName,
        @Pattern(regexp = NOT_BLANK_PATTERN, message = NOT_BLANK_VALIDATION_MESSAGE)
        @Email
        @Length(max = STANDARD_TEXT_MAX_LENGTH)
        String email,
        UserType userType

) {
}
