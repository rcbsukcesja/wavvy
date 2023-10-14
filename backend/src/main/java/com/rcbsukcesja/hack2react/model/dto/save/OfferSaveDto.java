package com.rcbsukcesja.hack2react.model.dto.save;

import com.rcbsukcesja.hack2react.model.enums.OfferScope;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDate;

import static com.rcbsukcesja.hack2react.validations.ValidationConstants.DESCRIPTION_MAX_LENGTH;
import static com.rcbsukcesja.hack2react.validations.ValidationConstants.STANDARD_TEXT_MAX_LENGTH;

@Builder
public record OfferSaveDto(

        @NotBlank
        @Size(max = STANDARD_TEXT_MAX_LENGTH)
        String name,
        @NotBlank
        @Size(max = DESCRIPTION_MAX_LENGTH)
        String description,
        @DecimalMin("0.00")
        @Digits(integer = 15, fraction = 2)
        @NotNull
        BigDecimal budget,
        @Min(0)
        @Max(100)
        @NotNull
        Integer fundingLevel,
        @Size(max = STANDARD_TEXT_MAX_LENGTH)
        String targetAudience,
        @Size(max = STANDARD_TEXT_MAX_LENGTH)
        String link,
        LocalDate startDate,
        LocalDate endDate,
        @NotNull
        OfferScope scope
) {

}
