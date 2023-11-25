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

import static com.rcbsukcesja.hack2react.validations.ValidationConstants.*;

@Builder
public record ProjectSaveDto(
        @NotBlank
        @Size(max = STANDARD_TEXT_MAX_LENGTH)
        String name,
        @NotBlank
        @Size(max = DESCRIPTION_MAX_LENGTH)
        String description,
        ProjectAddressSaveDto address,
        @NotNull
        ZonedDateTime startTime,
        @NotNull
        ZonedDateTime endTime,
        @NotNull
        BigDecimal budget,
        @Size(max = STANDARD_TEXT_MAX_LENGTH)
        String cooperationMessage,

        @NotNull
        UUID organizerId, // TODO: remove from here and set it by system
        @NotNull
        ProjectStatus status,
        @Size(min = PROJECT_TAG_MIN, max = PROJECT_TAG_MAX, message = PROJECT_TAGS_VALIDATION_MESSAGE)
        Set<@Size(max = STANDARD_TEXT_MAX_LENGTH) String> tags,

        Set<@Size(max = STANDARD_TEXT_MAX_LENGTH) String> links,
        @NotNull
        boolean possibleVolunteer,
        @Size(max = DESCRIPTION_MAX_LENGTH)
        String reason
) {
}
