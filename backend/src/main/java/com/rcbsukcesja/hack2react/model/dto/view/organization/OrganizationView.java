package com.rcbsukcesja.hack2react.model.dto.view.organization;

import com.rcbsukcesja.hack2react.model.dto.view.BusinessAreaView;
import com.rcbsukcesja.hack2react.model.dto.view.UserLightweightView;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.OffsetDateTime;
import java.util.Set;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@SuperBuilder
public abstract class OrganizationView {
    private UUID id;
    private String name;
    private UserLightweightView owner;
    private String address;
    private String phone;
    private String email;
    private String website;
    private Set<String> socialLinks;
    private OffsetDateTime creationTime;
    private String description;
    private Set<BusinessAreaView> businessAreas;
    private String krs;
    private String nip;
    private String regon;
    private Set<String> resources;
}
