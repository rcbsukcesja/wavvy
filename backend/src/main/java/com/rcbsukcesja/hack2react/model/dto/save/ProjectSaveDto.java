package com.rcbsukcesja.hack2react.model.dto.save;

import com.rcbsukcesja.hack2react.model.enums.ProjectStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import org.hibernate.validator.constraints.Length;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.Set;
import java.util.UUID;

import static com.rcbsukcesja.hack2react.validations.ValidationConstants.DESCRIPTION_MAX_LENGTH;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.STANDARD_TEXT_MAX_LENGTH;

@Builder
public record ProjectSaveDto(
        @NotBlank
        @Length(max = STANDARD_TEXT_MAX_LENGTH)
        String name,
        @NotBlank
        @Length(max = DESCRIPTION_MAX_LENGTH)
        String description,
        @NotBlank
        @Length(max = STANDARD_TEXT_MAX_LENGTH)
        String address,
        @NotBlank
        @Length(max = STANDARD_TEXT_MAX_LENGTH)
        String imageLink,
        @Length(max = STANDARD_TEXT_MAX_LENGTH)
        String link,
        @NotNull
        OffsetDateTime startTime,
        @NotNull
        OffsetDateTime endTime,
        @NotNull
        BigDecimal budget,
        @Length(max = STANDARD_TEXT_MAX_LENGTH)
        String cooperationMessage,
        UUID organizerId, // TODO: remove from here and set it by system
        Set<UUID> categoryIds,
        @NotNull
        ProjectStatus status,
        Set<@Length(max = STANDARD_TEXT_MAX_LENGTH) String> tags,
        @NotNull
        boolean possibleVolunteer
) {
}
