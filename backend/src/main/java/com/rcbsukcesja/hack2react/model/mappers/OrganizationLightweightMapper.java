package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.view.organization.OrganizationLightweightView;
import com.rcbsukcesja.hack2react.model.entity.Organization;
import org.mapstruct.Mapper;

import java.util.Set;

@Mapper(componentModel = "spring")
public interface OrganizationLightweightMapper {

    OrganizationLightweightView organizationToOrganizationLightweightView(Organization organization);

    Set<OrganizationLightweightView> organizationSetToOrganizationLightweightViewSet(Set<Organization> organizationSet);

}
