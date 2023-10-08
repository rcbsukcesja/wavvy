package com.rcbsukcesja.hack2react.model.dto.save;

import com.rcbsukcesja.hack2react.model.enums.UserType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import org.hibernate.validator.constraints.Length;

import static com.rcbsukcesja.hack2react.validations.ValidationConstants.STANDARD_TEXT_MAX_LENGTH;

@Builder
public record UserSaveDto(
        @NotBlank
        @Length(max = STANDARD_TEXT_MAX_LENGTH)
        String username,
        @NotBlank
        @Length(max = STANDARD_TEXT_MAX_LENGTH)
        String firstName,
        @NotBlank
        @Length(max = STANDARD_TEXT_MAX_LENGTH)
        String lastName,
        @NotBlank
        @Email
        @Length(max = STANDARD_TEXT_MAX_LENGTH)
        String email,
        @NotNull
        UserType userType

) {
}
