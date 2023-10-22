package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.view.organization.OrganizationLightweightView;
import com.rcbsukcesja.hack2react.model.entity.OrganizationNGO;
import com.rcbsukcesja.hack2react.model.entity.SocialLink;
import org.mapstruct.Mapper;

import java.util.Set;

@Mapper(componentModel = "spring")
public interface OrganizationNGOLightweightMapper {

    OrganizationLightweightView organizationNGOToOrganizationLightweightView(OrganizationNGO organizationNGO);

    Set<OrganizationLightweightView> organizationNGOSetToOrganizationLightweightViewSet(Set<OrganizationNGO> organizationNGOSet);

    default Set<String> map(Set<SocialLink> socialLinks) {
        return socialLinks.stream()
                .map(SocialLink::getLink)
                .collect(java.util.stream.Collectors.toSet());
    }
}
