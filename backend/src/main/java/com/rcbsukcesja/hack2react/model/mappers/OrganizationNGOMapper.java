package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.view.organization.OrganizationNGOListView;
import com.rcbsukcesja.hack2react.model.dto.view.organization.OrganizationNGOView;
import com.rcbsukcesja.hack2react.model.entity.OrganizationNGO;
import com.rcbsukcesja.hack2react.utils.TimeUtils;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Mapper(componentModel = "spring", uses = {
        BusinessAreaMapper.class,
        ProjectLightweightMapper.class,
        UserLightweightMapper.class,
        ResourceMapper.class,
        SocialLinkMapper.class,
        OrganizationNGOTagMapper.class,
        AddressMapper.class
})
public interface OrganizationNGOMapper {

    OrganizationNGOView organizationNGOToOrganizationNGOView(OrganizationNGO organizationNGO);

    OrganizationNGOListView organizationNGOToOrganizationNGOListView(OrganizationNGO organizationNGO);

    default LocalDateTime UTCtoLocalDateTimeInZone(ZonedDateTime zonedDateTime) {
        return TimeUtils.toLocalDateTimeInZone(zonedDateTime);
    }

}
