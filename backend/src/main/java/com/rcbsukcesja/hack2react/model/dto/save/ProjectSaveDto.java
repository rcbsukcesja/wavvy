package com.rcbsukcesja.hack2react.model.dto.save;

import com.rcbsukcesja.hack2react.model.enums.ProjectStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.Set;
import java.util.UUID;

import static com.rcbsukcesja.hack2react.validations.ValidationConstants.DESCRIPTION_MAX_LENGTH;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.STANDARD_TEXT_MAX_LENGTH;

@Builder
public record ProjectSaveDto(
        @NotBlank
        @Size(max = STANDARD_TEXT_MAX_LENGTH)
        String name,
        @NotBlank
        @Size(max = DESCRIPTION_MAX_LENGTH)
        String description,
        @NotBlank
        @Size(max = STANDARD_TEXT_MAX_LENGTH)
        String address,
        @NotBlank
        @Size(max = STANDARD_TEXT_MAX_LENGTH)
        String imageLink,
        @Size(max = STANDARD_TEXT_MAX_LENGTH)
        String link,
        @NotNull
        ZonedDateTime startTime,
        @NotNull
        ZonedDateTime endTime,
        @NotNull
        BigDecimal budget,
        @Size(max = STANDARD_TEXT_MAX_LENGTH)
        String cooperationMessage,
        UUID organizerId, // TODO: remove from here and set it by system
        Set<UUID> categoryIds,
        @NotNull
        ProjectStatus status,
        Set<@Size(max = STANDARD_TEXT_MAX_LENGTH) String> tags,
        @NotNull
        boolean possibleVolunteer
) {
}
