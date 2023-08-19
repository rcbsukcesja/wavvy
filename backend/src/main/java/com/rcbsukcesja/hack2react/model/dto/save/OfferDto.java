package com.rcbsukcesja.hack2react.model.dto.save;

import com.rcbsukcesja.hack2react.model.enums.OfferScope;
import lombok.Builder;

import java.util.Date;

@Builder
public record OfferDto(
        String name,
        String description,
        String link,
        Date startDate,
        Date endDate,
        boolean closeDeadline,
        OfferScope scope
) {

}
