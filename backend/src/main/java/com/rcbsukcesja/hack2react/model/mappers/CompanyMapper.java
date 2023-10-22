package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.view.organization.CompanyListView;
import com.rcbsukcesja.hack2react.model.dto.view.organization.CompanyView;
import com.rcbsukcesja.hack2react.model.entity.Company;
import com.rcbsukcesja.hack2react.utils.TimeUtils;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Mapper(componentModel = "spring", uses = {
        BusinessAreaMapper.class,
        UserLightweightMapper.class,
        ResourceMapper.class,
        SocialLinkMapper.class,
        AddressMapper.class
})
public interface CompanyMapper {

    CompanyView companyToCompanyView(Company company);

    CompanyListView companyToCompanyListView(Company company);

    default LocalDateTime UTCtoLocalDateTimeInZone(ZonedDateTime zonedDateTime) {
        return TimeUtils.toLocalDateTimeInZone(zonedDateTime);
    }
}
