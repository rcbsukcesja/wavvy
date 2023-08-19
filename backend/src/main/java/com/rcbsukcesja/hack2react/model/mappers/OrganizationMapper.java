package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.view.organization.CompanyView;
import com.rcbsukcesja.hack2react.model.dto.view.organization.OrganizationNGOView;
import com.rcbsukcesja.hack2react.model.dto.view.organization.OrganizationView;
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

    public List<Organization> organizationViewListToOrganizationList(List<OrganizationView> organizationViewList) {
        List<Organization> organizations = new ArrayList<>();
        if (organizationViewList != null) {
            for (OrganizationView organizationView : organizationViewList) {
                if (organizationView instanceof CompanyView companyView) {
                    organizations.add(companyMapper.companyViewToCompany(companyView));
                } else if (organizationView instanceof OrganizationNGOView organizationNGODto) {
                    organizations.add(organizationNGOMapper.organizationNGOViewToOrganizationNGO(organizationNGODto));
                }
            }
        }
        return organizations;
    }

    public List<OrganizationView> organizationListToOrganizationViewList(List<Organization> organizationList) {
        List<OrganizationView> organizations = new ArrayList<>();
        if (organizationList != null) {
            for (Organization organization : organizationList) {
                if (organization instanceof Company company) {
                    organizations.add(companyMapper.companyToCompanyView(company));
                } else if (organization instanceof OrganizationNGO organizationNGO) {
                    organizations.add(organizationNGOMapper.organizationNGOToOrganizationNGOView(organizationNGO));
                }
            }
        }
        return organizations;
    }

}
