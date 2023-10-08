package com.rcbsukcesja.hack2react.model.dto.view;

import com.rcbsukcesja.hack2react.model.dto.view.organization.OrganizationLightweightView;
import com.rcbsukcesja.hack2react.model.enums.ProjectStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.Set;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class ProjectView {
    private UUID id;
    private String name;
    private String description;
    private String address;
    private String imageLink;
    private String link;
    private OffsetDateTime startTime;
    private OffsetDateTime endTime;
    private BigDecimal budget;
    private String cooperationMessage;
    private OrganizationLightweightView organizer;
    private Set<BusinessAreaView> categories;
    private ProjectStatus status;
    private Set<String> tags;
    private boolean possibleVolunteer;
}
