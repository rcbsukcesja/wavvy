package com.rcbsukcesja.hack2react.model.dto.view.organization;

import com.rcbsukcesja.hack2react.model.dto.view.AddressView;
import com.rcbsukcesja.hack2react.model.dto.view.BusinessAreaView;
import com.rcbsukcesja.hack2react.model.dto.view.UserLightweightView;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
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
    private String description;
    private UserLightweightView owner;
    private AddressView address;
    private String phone;
    private String email;
    private String website;
    private String logoUrl;

    private String krs;
    private String nip;
    private String regon;

    private Set<BusinessAreaView> businessAreas;
    private Set<String> socialLinks;
    private Set<String> resources;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private boolean confirmed;
}
