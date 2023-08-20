package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.save.OrganizationNGODto;
import com.rcbsukcesja.hack2react.model.dto.view.organization.OrganizationNGOView;
import com.rcbsukcesja.hack2react.model.entity.OrganizationNGO;
import com.rcbsukcesja.hack2react.service.BusinessAreaService;
import com.rcbsukcesja.hack2react.service.UserService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {
        UserService.class,
        BusinessAreaService.class,
        BusinessAreaMapper.class,
        CompanyMapper.class,
        ProjectLightweightMapper.class,
        UserLightweightMapper.class
})
public interface OrganizationNGOMapper {

    @Mapping(source = "owner.id", target = "owner")
    @Mapping(target = "logo", ignore = true)
    OrganizationNGO organizationNGOViewToOrganizationNGO(OrganizationNGOView organizationNGODto);

    OrganizationNGOView organizationNGOToOrganizationNGOView(OrganizationNGO organizationNGO);

    @Mapping(target = "id", ignore = true)
    @Mapping(source = "ownerId", target = "owner")
    @Mapping(source = "businessAreaIds", target = "businessAreas")
    OrganizationNGO organizationNGODtoToOrganizationNGO(OrganizationNGODto organizationNGODto);

}
