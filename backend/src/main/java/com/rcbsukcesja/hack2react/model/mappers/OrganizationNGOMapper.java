package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.view.organization.OrganizationNGOListView;
import com.rcbsukcesja.hack2react.model.dto.view.organization.OrganizationNGOView;
import com.rcbsukcesja.hack2react.model.entity.OrganizationNGO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {
        BusinessAreaMapper.class,
        ProjectLightweightMapper.class,
        UserLightweightMapper.class,
        ResourceMapper.class,
        SocialLinkMapper.class
})
public interface OrganizationNGOMapper {

    OrganizationNGOView organizationNGOToOrganizationNGOView(OrganizationNGO organizationNGO);

    OrganizationNGOListView organizationNGOToOrganizationNGOListView(OrganizationNGO organizationNGO);


}
