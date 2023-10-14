package com.rcbsukcesja.hack2react.model.dto.save;

import com.rcbsukcesja.hack2react.model.enums.UserType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import static com.rcbsukcesja.hack2react.validations.ValidationConstants.STANDARD_TEXT_MAX_LENGTH;

@Builder
public record UserSaveDto(
        @NotBlank
        @Size(max = STANDARD_TEXT_MAX_LENGTH)
        String username,
        @NotBlank
        @Size(max = STANDARD_TEXT_MAX_LENGTH)
        String firstName,
        @NotBlank
        @Size(max = STANDARD_TEXT_MAX_LENGTH)
        String lastName,
        @NotBlank
        @Email
        @Size(max = STANDARD_TEXT_MAX_LENGTH)
        String email,
        @NotNull
        UserType userType

) {
}
