package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.organization.OrganizationNGODto;
import com.rcbsukcesja.hack2react.model.entity.OrganizationNGO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {CompanyMapper.class, ProjectMapper.class, UserMapper.class})
public interface OrganizationNGOMapper {

    OrganizationNGO organizationNGODtoToOrganizationNGO(OrganizationNGODto organizationNGODto);

    OrganizationNGODto organizationNGOToOrganizationNGODto(OrganizationNGO organizationNGO);

}
