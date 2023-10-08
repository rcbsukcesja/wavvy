package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.view.organization.CompanyListView;
import com.rcbsukcesja.hack2react.model.dto.view.organization.CompanyView;
import com.rcbsukcesja.hack2react.model.entity.Company;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {
        BusinessAreaMapper.class,
        UserLightweightMapper.class,
        ResourceMapper.class,
        SocialLinkMapper.class
})
public interface CompanyMapper {

    CompanyView companyToCompanyView(Company company);

    CompanyListView companyToCompanyListView(Company company);
}
