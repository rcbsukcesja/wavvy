package com.rcbsukcesja.hack2react.model.dto.save;

import com.rcbsukcesja.hack2react.model.enums.ProjectStatus;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import org.hibernate.validator.constraints.Length;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.Set;
import java.util.UUID;

import static com.rcbsukcesja.hack2react.validations.ValidationConstants.DESCRIPTION_MAX_LENGTH;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.NOT_BLANK_PATTERN;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.NOT_BLANK_VALIDATION_MESSAGE;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.STANDARD_TEXT_MAX_LENGTH;

@Builder
public record ProjectPatchDto(
        @Pattern(regexp = NOT_BLANK_PATTERN,
                message = NOT_BLANK_VALIDATION_MESSAGE)
        @Length(max = STANDARD_TEXT_MAX_LENGTH)
        String name,
        @Pattern(regexp = NOT_BLANK_PATTERN,
                message = NOT_BLANK_VALIDATION_MESSAGE)
        @Length(max = DESCRIPTION_MAX_LENGTH)
        String description,
        @Pattern(regexp = NOT_BLANK_PATTERN,
                message = NOT_BLANK_VALIDATION_MESSAGE)
        @Length(max = STANDARD_TEXT_MAX_LENGTH)
        String address,
        @Pattern(regexp = NOT_BLANK_PATTERN,
                message = NOT_BLANK_VALIDATION_MESSAGE)
        @Length(max = STANDARD_TEXT_MAX_LENGTH)
        String imageLink,

        @Length(max = STANDARD_TEXT_MAX_LENGTH)
        String link,
        OffsetDateTime startTime,
        OffsetDateTime endTime,
        BigDecimal budget,
        @Length(max = STANDARD_TEXT_MAX_LENGTH)
        String cooperationMessage,
        UUID organizerId,
        Set<UUID> categoryIds,
        ProjectStatus status,
        Set<@Length(max = STANDARD_TEXT_MAX_LENGTH) String> tags,
        boolean possibleVolunteer
) {
}
