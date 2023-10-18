package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.view.organization.OrganizationNGOListView;
import com.rcbsukcesja.hack2react.model.dto.view.organization.OrganizationNGOView;
import com.rcbsukcesja.hack2react.model.entity.OrganizationNGO;
import com.rcbsukcesja.hack2react.utils.TimeUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.time.ZonedDateTime;

@Mapper(componentModel = "spring", uses = {
        BusinessAreaMapper.class,
        ProjectLightweightMapper.class,
        UserLightweightMapper.class,
        ResourceMapper.class,
        SocialLinkMapper.class
})
public interface OrganizationNGOMapper {

    @Mapping(source = "creationTime", target = "creationTime", qualifiedByName = "UTCtoZonedDateTime")
    OrganizationNGOView organizationNGOToOrganizationNGOView(OrganizationNGO organizationNGO);

    @Mapping(source = "creationTime", target = "creationTime", qualifiedByName = "UTCtoZonedDateTime")
    OrganizationNGOListView organizationNGOToOrganizationNGOListView(OrganizationNGO organizationNGO);

    @Named("UTCtoZonedDateTime")
    default ZonedDateTime UTCtoZonedDateTime(ZonedDateTime zonedDateTime) {
        return TimeUtils.dateTimeInZone(zonedDateTime);
    }

}
