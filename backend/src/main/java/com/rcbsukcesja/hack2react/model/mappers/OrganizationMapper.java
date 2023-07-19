package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.organization.CompanyDto;
import com.rcbsukcesja.hack2react.model.dto.organization.OrganizationDto;
import com.rcbsukcesja.hack2react.model.dto.organization.OrganizationNGODto;
import com.rcbsukcesja.hack2react.model.entity.Company;
import com.rcbsukcesja.hack2react.model.entity.Organization;
import com.rcbsukcesja.hack2react.model.entity.OrganizationNGO;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring", uses = {CompanyMapper.class, OrganizationNGOMapper.class})
public abstract class OrganizationMapper {
    @Autowired
    protected CompanyMapper companyMapper;

    @Autowired
    protected OrganizationNGOMapper organizationNGOMapper;

    public List<Organization> organizationDtoListToOrganizationList(List<OrganizationDto> organizationDtoList) {
        List<Organization> organizations = new ArrayList<>();
        if (organizationDtoList != null) {
            for (OrganizationDto organizationDto : organizationDtoList) {
                if (organizationDto instanceof CompanyDto companyDto) {
                    organizations.add(companyMapper.companyDtoToCompany(companyDto));
                } else if (organizationDto instanceof OrganizationNGODto organizationNGODto) {
                    organizations.add(organizationNGOMapper.organizationNGODtoToOrganizationNGO(organizationNGODto));
                }
            }
        }
        return organizations;
    }

    public List<OrganizationDto> organizationListToOrganizationDtoList(List<Organization> organizationList) {
        List<OrganizationDto> organizations = new ArrayList<>();
        if (organizationList != null) {
            for (Organization organization : organizationList) {
                if (organization instanceof Company company) {
                    organizations.add(companyMapper.companyToCompanyDto(company));
                } else if (organization instanceof OrganizationNGO organizationNGO) {
                    organizations.add(organizationNGOMapper.organizationNGOToOrganizationNGODto(organizationNGO));
                }
            }
        }
        return organizations;
    }

}
