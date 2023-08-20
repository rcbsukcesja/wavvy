package com.rcbsukcesja.hack2react.model.dto.view.organization;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.rcbsukcesja.hack2react.model.dto.view.BusinessAreaView;
import com.rcbsukcesja.hack2react.model.dto.view.UserLightweightView;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@SuperBuilder
@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        property = "dtoType"
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = CompanyView.class, name = "company"),
        @JsonSubTypes.Type(value = OrganizationNGOView.class, name = "organizationNGO")
})
public abstract class OrganizationView {
    private UUID id;
    private String name;
    private UserLightweightView owner;
    private String address;
    private String phone;
    private String email;
    private String website;
    private List<String> socialLinks;
    private OffsetDateTime creationTime;
    private String description;
    private Set<BusinessAreaView> businessAreas;
    private String KRS;
    private String NIP;
    private String REGON;
    private List<String> resources;
}
