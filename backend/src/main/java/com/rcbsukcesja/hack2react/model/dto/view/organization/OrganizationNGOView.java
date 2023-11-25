package com.rcbsukcesja.hack2react.model.dto.view.organization;

import com.rcbsukcesja.hack2react.model.dto.view.ProjectLightweightView;
import com.rcbsukcesja.hack2react.model.enums.LegalStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@SuperBuilder
public class OrganizationNGOView extends OrganizationView {

    private LegalStatus legalStatus;
    private String bankAccount;
    private Set<ProjectLightweightView> projects;
    private Set<String> tags;
    private LocalDate foundedAt;
}
