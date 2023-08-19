package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.save.OrganizationNGODto;
import com.rcbsukcesja.hack2react.model.dto.view.organization.OrganizationNGOView;
import com.rcbsukcesja.hack2react.model.entity.OrganizationNGO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {CompanyMapper.class, ProjectLightweightMapper.class, UserLightweightMapper.class})
public interface OrganizationNGOMapper {

    OrganizationNGO organizationNGOViewToOrganizationNGO(OrganizationNGOView organizationNGODto);

    OrganizationNGOView organizationNGOToOrganizationNGOView(OrganizationNGO organizationNGO);

    OrganizationNGO organizationNGODtoToOrganizationNGO(OrganizationNGODto organizationNGODto);
}
