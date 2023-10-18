package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.view.organization.CompanyListView;
import com.rcbsukcesja.hack2react.model.dto.view.organization.CompanyView;
import com.rcbsukcesja.hack2react.model.entity.Company;
import com.rcbsukcesja.hack2react.utils.TimeUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.time.ZonedDateTime;

@Mapper(componentModel = "spring", uses = {
        BusinessAreaMapper.class,
        UserLightweightMapper.class,
        ResourceMapper.class,
        SocialLinkMapper.class
})
public interface CompanyMapper {

    @Mapping(source = "creationTime", target = "creationTime", qualifiedByName = "UTCtoZonedDateTime")
    CompanyView companyToCompanyView(Company company);

    @Mapping(source = "creationTime", target = "creationTime", qualifiedByName = "UTCtoZonedDateTime")
    CompanyListView companyToCompanyListView(Company company);

    @Named("UTCtoZonedDateTime")
    default ZonedDateTime UTCtoZonedDateTime(ZonedDateTime zonedDateTime) {
        return TimeUtils.dateTimeInZone(zonedDateTime);
    }
}
