package com.rcbsukcesja.hack2react.model.dto.save;


import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import org.hibernate.validator.constraints.Length;

import static com.rcbsukcesja.hack2react.validations.ValidationConstants.STANDARD_TEXT_MAX_LENGTH;

@Builder
public record BusinessAreaDto(
        @NotBlank
        @Length(max = STANDARD_TEXT_MAX_LENGTH)
        String name
) {
}
