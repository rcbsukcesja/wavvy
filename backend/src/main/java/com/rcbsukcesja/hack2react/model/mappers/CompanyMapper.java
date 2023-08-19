package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.view.organization.CompanyView;
import com.rcbsukcesja.hack2react.model.entity.Company;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {ProjectMapper.class})
public interface CompanyMapper {

    Company companyViewToCompany(CompanyView companyView);

    CompanyView companyToCompanyView(Company company);
}
