package com.rcbsukcesja.hack2react.model.dto.view.organization;

import com.rcbsukcesja.hack2react.model.enums.LegalStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@SuperBuilder
public class OrganizationNGOListView extends OrganizationListView {

    private String logoUrl;
    private LegalStatus legalStatus;

}
