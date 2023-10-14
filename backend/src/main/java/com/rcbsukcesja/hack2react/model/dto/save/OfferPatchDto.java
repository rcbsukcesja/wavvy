package com.rcbsukcesja.hack2react.model.dto.save;

import com.rcbsukcesja.hack2react.model.enums.OfferScope;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDate;

import static com.rcbsukcesja.hack2react.validations.ValidationConstants.DESCRIPTION_MAX_LENGTH;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.NOT_BLANK_PATTERN;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.NOT_BLANK_VALIDATION_MESSAGE;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.STANDARD_TEXT_MAX_LENGTH;

@Builder
public record OfferPatchDto(

        @Pattern(regexp = NOT_BLANK_PATTERN, message = NOT_BLANK_VALIDATION_MESSAGE)
        @Size(max = STANDARD_TEXT_MAX_LENGTH)
        String name,
        @Pattern(regexp = NOT_BLANK_PATTERN, message = NOT_BLANK_VALIDATION_MESSAGE)
        @Size(max = DESCRIPTION_MAX_LENGTH)
        String description,
        @DecimalMin("0.00")
        @Digits(integer = 15, fraction = 2)
        BigDecimal budget,
        @Min(0)
        @Max(100)
        Integer fundingLevel,
        @Size(max = STANDARD_TEXT_MAX_LENGTH)
        String targetAudience,
        @Size(max = STANDARD_TEXT_MAX_LENGTH)
        String link,
        LocalDate startDate,
        LocalDate endDate,
        OfferScope scope
) {

}
