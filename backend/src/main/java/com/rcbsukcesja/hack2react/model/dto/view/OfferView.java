package com.rcbsukcesja.hack2react.model.dto.view;

import com.rcbsukcesja.hack2react.model.enums.OfferScope;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class OfferView {

    private UUID id;
    private String name;
    private String description;
    private String link;
    private Date startDate;
    private Date endDate;
    private boolean closeDeadline;
    private OfferScope scope;
}
