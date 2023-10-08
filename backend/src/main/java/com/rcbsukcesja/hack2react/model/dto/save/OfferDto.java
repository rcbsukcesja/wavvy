package com.rcbsukcesja.hack2react.model.dto.save;

import com.rcbsukcesja.hack2react.model.enums.OfferScope;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDate;

@Builder
public record OfferDto(
        String name,
        String description,
        BigDecimal budget,
        int fundingLevel,
        String targetAudience,
        String link,
        boolean closeDeadline,
        LocalDate startDate,
        LocalDate endDate,
        OfferScope scope
) {

}
