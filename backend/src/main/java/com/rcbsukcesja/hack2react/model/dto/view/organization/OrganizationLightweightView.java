package com.rcbsukcesja.hack2react.model.dto.view.organization;

import com.rcbsukcesja.hack2react.model.dto.view.AddressView;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class OrganizationLightweightView {
    private UUID id;
    private String name;
    private AddressView address;
    private String email;
    private String phone;
    private String website;
    private Set<String> socialLinks;
    private String bankAccount;

}
