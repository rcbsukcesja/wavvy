package com.rcbsukcesja.hack2react.model.dto.organization;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.rcbsukcesja.hack2react.model.dto.BusinessAreaDto;
import com.rcbsukcesja.hack2react.model.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Getter
@Setter
@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        property = "dtoType"
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = CompanyDto.class, name = "company"),
        @JsonSubTypes.Type(value = OrganizationNGODto.class, name = "organizationNGO")
})
public abstract class OrganizationDto {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private UUID id;
    private String name;
    private List<UserDto> owners;
    private String address;
    private String phone;
    private String email;
    private String website;
    private String logoUrl;
    private List<String> socialLinks;
    private LocalDate creationDate;
    private String description;
    private List<BusinessAreaDto> businnessAreas;
    private String KRS;
    private String NIP;
    private List<String> resource;
}
