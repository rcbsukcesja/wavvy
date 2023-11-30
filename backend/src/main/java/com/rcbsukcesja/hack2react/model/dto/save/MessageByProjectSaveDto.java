package com.rcbsukcesja.hack2react.model.dto.save;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import java.util.UUID;

import static com.rcbsukcesja.hack2react.validations.ValidationConstants.MESSAGE_MAX_LENGTH;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.STANDARD_TEXT_MAX_LENGTH;

@Builder
public record MessageByProjectSaveDto(
        UUID projectId,
        @NotBlank
        @Size(max = MESSAGE_MAX_LENGTH)
        String message,
        @NotBlank
        @Size(max = STANDARD_TEXT_MAX_LENGTH)
        String name,
        @NotBlank
        @Size(max = STANDARD_TEXT_MAX_LENGTH)
        String contact,
        @NotBlank
        @Size(max = STANDARD_TEXT_MAX_LENGTH)
        String title
) {
}
