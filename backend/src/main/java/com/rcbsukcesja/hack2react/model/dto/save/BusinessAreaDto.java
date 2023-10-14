package com.rcbsukcesja.hack2react.model.dto.save;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import static com.rcbsukcesja.hack2react.validations.ValidationConstants.STANDARD_TEXT_MAX_LENGTH;

@Builder
public record BusinessAreaDto(
        @NotBlank
        @Size(max = STANDARD_TEXT_MAX_LENGTH)
        String name
) {
}
