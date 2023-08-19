package com.rcbsukcesja.hack2react.model.dto.save;

import com.rcbsukcesja.hack2react.model.enums.LegalStatus;
import lombok.Builder;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Builder
public record OrganizationNGODto(
        String name,
        UUID ownerId,
        String address,
        String phone,
        String email,
        String website,
        byte[] logo,
        List<String> socialLinks,
        String description,
        Set<UUID> businessAreaIds,
        String KRS,
        String NIP,
        String REGON,
        List<String> resource,
        LegalStatus legalStatus,
        Set<UUID> projectIds
) {

}
