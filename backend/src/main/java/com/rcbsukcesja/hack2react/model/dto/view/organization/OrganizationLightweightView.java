package com.rcbsukcesja.hack2react.model.dto.view.organization;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class OrganizationLightweightView {
    private UUID id;
    private String name;
}
