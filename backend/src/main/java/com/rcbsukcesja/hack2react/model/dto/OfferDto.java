package com.rcbsukcesja.hack2react.model.dto;

import com.rcbsukcesja.hack2react.model.enums.OfferScope;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class OfferDto {

    private UUID id;
    private String name;
    private String description;
    private String link;
    private LocalDate startDate;
    private LocalDate endDate;
    private boolean closeDeadline;
    private OfferScope scope;
}
