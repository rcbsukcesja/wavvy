package com.rcbsukcesja.hack2react.model.dto.save;

import jakarta.validation.constraints.Size;
import lombok.Builder;

import static com.rcbsukcesja.hack2react.validations.ValidationConstants.MESSAGE_MAX_LENGTH;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.STANDARD_TEXT_MAX_LENGTH;

@Builder
public record MessagePathDto(
        @Size(max = MESSAGE_MAX_LENGTH)
        String message,
        @Size(max = STANDARD_TEXT_MAX_LENGTH)
        String name,
        @Size(max = STANDARD_TEXT_MAX_LENGTH)
        String contact,
        @Size(max = STANDARD_TEXT_MAX_LENGTH)
        String title
) {

}
