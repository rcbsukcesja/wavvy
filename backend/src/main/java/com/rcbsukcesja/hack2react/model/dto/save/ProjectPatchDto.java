package com.rcbsukcesja.hack2react.model.dto.save;

import com.rcbsukcesja.hack2react.model.enums.ProjectStatus;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.Set;
import java.util.UUID;

import static com.rcbsukcesja.hack2react.validations.ValidationConstants.DESCRIPTION_MAX_LENGTH;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.NOT_BLANK_PATTERN;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.NOT_BLANK_VALIDATION_MESSAGE;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.PROJECT_TAGS_VALIDATION_MESSAGE;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.PROJECT_TAG_MAX;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.PROJECT_TAG_MIN;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.REASON_MAX_LENGTH;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.STANDARD_TEXT_MAX_LENGTH;

@Builder
public record ProjectPatchDto(
        @Pattern(regexp = NOT_BLANK_PATTERN,
                message = NOT_BLANK_VALIDATION_MESSAGE)
        @Size(max = STANDARD_TEXT_MAX_LENGTH)
        String name,
        @Pattern(regexp = NOT_BLANK_PATTERN,
                message = NOT_BLANK_VALIDATION_MESSAGE)
        @Size(max = DESCRIPTION_MAX_LENGTH)
        String description,
        ProjectAddressPatchDto address,
        ZonedDateTime startTime,
        ZonedDateTime endTime,
        BigDecimal budget,
        @Size(max = STANDARD_TEXT_MAX_LENGTH)
        String cooperationMessage,
        UUID organizerId,
        ProjectStatus status,
        @Size(min = PROJECT_TAG_MIN, max = PROJECT_TAG_MAX, message = PROJECT_TAGS_VALIDATION_MESSAGE)
        Set<@Size(max = STANDARD_TEXT_MAX_LENGTH) String> tags,

        Set<@Size(max = STANDARD_TEXT_MAX_LENGTH) String> links,
        boolean possibleVolunteer,
        @Size(max = REASON_MAX_LENGTH)
        String reason,
        Boolean disabled
) {
}
