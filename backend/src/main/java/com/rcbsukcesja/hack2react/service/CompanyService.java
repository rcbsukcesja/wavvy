package com.rcbsukcesja.hack2react.service;

import com.rcbsukcesja.hack2react.exceptions.badrequest.ReasonValueException;
import com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages;
import com.rcbsukcesja.hack2react.exceptions.notFound.BusinessAreaNotFoundException;
import com.rcbsukcesja.hack2react.exceptions.notFound.CompanyNotFoundException;
import com.rcbsukcesja.hack2react.exceptions.notFound.UserNotFoundException;
import com.rcbsukcesja.hack2react.model.dto.save.CompanyPatchDto;
import com.rcbsukcesja.hack2react.model.dto.save.CompanySaveDto;
import com.rcbsukcesja.hack2react.model.dto.view.organization.CompanyListView;
import com.rcbsukcesja.hack2react.model.dto.view.organization.CompanyView;
import com.rcbsukcesja.hack2react.model.entity.Company;
import com.rcbsukcesja.hack2react.model.entity.Resource;
import com.rcbsukcesja.hack2react.model.entity.SocialLink;
import com.rcbsukcesja.hack2react.model.entity.User;
import com.rcbsukcesja.hack2react.model.mappers.AddressMapper;
import com.rcbsukcesja.hack2react.model.mappers.CompanyMapper;
import com.rcbsukcesja.hack2react.repositories.BusinessAreaRepository;
import com.rcbsukcesja.hack2react.repositories.CompanyRepository;
import com.rcbsukcesja.hack2react.repositories.UserRepository;
import com.rcbsukcesja.hack2react.utils.TimeUtils;
import com.rcbsukcesja.hack2react.utils.TokenUtils;
import com.rcbsukcesja.hack2react.validations.OrganizationValidation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final CompanyMapper companyMapper;
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;
    private final BusinessAreaRepository businessAreaRepository;
    private final OrganizationValidation organizationValidation;
    private final AddressMapper addressMapper;


    public Page<CompanyListView> getAllCompany(Pageable pageable) {
        return companyRepository.findAll(pageable)
                .map(companyMapper::companyToCompanyListView);
    }

    public CompanyView getCompanyById(UUID id) {
        return companyMapper
                .companyToCompanyView(getCompanyByIdOrThrowException(id));
    }

    @Transactional
    public CompanyView createCompany(CompanySaveDto dto) {
        validateCreateCompany(dto);
        Company company = new Company();

        setCompanyBasicFields(dto, company);

        company.setResources(new HashSet<>());
        company.setSocialLinks(new HashSet<>());
        company.setDisabled(false);

        company = companyRepository.save(company);

        if (dto.resources() != null && !dto.resources().isEmpty()) {
            Set<Resource> resources = new HashSet<>();
            for (String resource : dto.resources()) {
                Resource newResource = new Resource();
                newResource.setResource(resource);
                newResource.setOrganization(company);
                resources.add(newResource);
            }
            company.setResources(resources);
        }

        if (dto.socialLinks() != null && !dto.socialLinks().isEmpty()) {
            Set<SocialLink> socialLinks = new HashSet<>();
            for (String link : dto.socialLinks()) {
                SocialLink socialLink = new SocialLink();
                socialLink.setLink(link);
                socialLink.setOrganization(company);
                socialLinks.add(socialLink);
            }
            company.setSocialLinks(socialLinks);
        }

        company = companyRepository.saveAndFlush(company);
        return companyMapper.companyToCompanyView(company);
    }

    @Transactional
    public CompanyView putUpdateCompany(UUID companyId, CompanySaveDto dto) {
        Company company = getCompanyByIdOrThrowException(companyId);
        validateUpdateCompany(dto, company);

        setCompanyBasicFields(dto, company);

        if (dto.disabled() != null) {
            if (dto.disabled()) {
                if (dto.reason() == null) {
                    throw new ReasonValueException(ErrorMessages.REASON_MUST_NOT_BE_NULL);
                }
            }
            company.setDisabled(dto.disabled());
        }
        if(dto.reason() != null && !dto.reason().equals(company.getReason())){
            company.setReason(dto.reason());
        }

        updateSocialLinks(company, dto.socialLinks());
        updateResources(company, dto.resources());

        company.setUpdatedAt(TimeUtils.nowInUTC());

        Company saved = companyRepository.saveAndFlush(company);
        return companyMapper.companyToCompanyView(saved);
    }

    @Transactional
    public CompanyView patchUpdateCompany(UUID companyId, CompanyPatchDto dto) {
        Company actual = getCompanyByIdOrThrowException(companyId);
        if (dto.name() != null && !actual.getName().equals(dto.name())) {
            if (actual.getName().equalsIgnoreCase(dto.name())) {
                actual.setName(dto.name());
            } else {
                organizationValidation.checkIfOrganizationNameAlreadyExists(dto.name());
                actual.setName(dto.name());
            }
        }
        if (dto.krs() != null && !actual.getKrs().equals(dto.krs())) {
            organizationValidation.checkIfOrganizationKrsAlreadyExists(dto.krs());
            actual.setKrs(dto.krs());
        }
        if (dto.nip() != null && !actual.getNip().equals(dto.nip())) {
            organizationValidation.checkIfOrganizationNipAlreadyExists(dto.nip());
            actual.setNip(dto.nip());
        }
        if (dto.regon() != null && !actual.getRegon().equals(dto.regon())) {
            organizationValidation.checkIfOrganizationRegonAlreadyExists(dto.regon());
            actual.setRegon(dto.regon());
        }
        if (dto.ownerId() != null && !actual.getOwner().getId().equals(dto.ownerId())) {
            actual.setOwner(userRepository.getUserById(dto.ownerId())
                    .orElseThrow(() -> new UserNotFoundException(ErrorMessages.USER_NOT_FOUND, dto.ownerId())));
        }
        if (dto.address() != null && !actual.getAddress().equals(addressMapper.organizationAddressPatchDtoToAddress(dto.address()))) {
            actual.setAddress(addressMapper.organizationAddressPatchDtoToAddress(dto.address()));
        }
        if (dto.phone() != null && !actual.getPhone().equals(dto.phone())) {
            actual.setPhone(dto.phone());
        }
        if (dto.email() != null && !actual.getEmail().equals(dto.email())) {
            actual.setEmail(dto.email());
        }
        if (dto.website() != null && !actual.getWebsite().equals(dto.website())) {
            actual.setWebsite(dto.website());
        }
        if (dto.description() != null && !actual.getDescription().equals(dto.description())) {
            actual.setDescription(dto.description());
        }
        if (dto.businessAreaIds() != null) {
            actual.setBusinessAreas(new HashSet<>(dto.businessAreaIds().stream()
                    .map(id -> businessAreaRepository.getBusinessAreaById(id)
                            .orElseThrow(() -> new BusinessAreaNotFoundException(ErrorMessages.BUSINESS_AREA_NOT_FOUND, id)))
                    .toList()));
        }
        if (dto.disabled() != null) {
            if (dto.disabled()) {
                if (dto.reason() == null) {
                    throw new ReasonValueException(ErrorMessages.REASON_MUST_NOT_BE_NULL);
                }
            }
            actual.setDisabled(dto.disabled());
        }
        if(dto.reason() != null && !dto.reason().equals(actual.getReason())){
            actual.setReason(dto.reason());
        }
        updateSocialLinks(actual, dto.socialLinks());
        updateResources(actual, dto.resources());

        actual.setUpdatedAt(TimeUtils.nowInUTC());

        Company updated = companyRepository.save(actual);
        return companyMapper.companyToCompanyView(updated);
    }

    @Transactional
    public void deleteCompany(UUID id) {
        Company company = getCompanyByIdOrThrowException(id);
        companyRepository.delete(company);
    }

    private void setCompanyBasicFields(CompanySaveDto dto, Company company) {
        company.setName(dto.name());
        company.setKrs(dto.krs());
        company.setNip(dto.nip());
        company.setRegon(dto.regon());
        company.setOwner(userRepository.getUserById(dto.ownerId())
                .orElseThrow(() -> new UserNotFoundException(ErrorMessages.USER_NOT_FOUND, dto.ownerId())));
        company.setAddress(addressMapper.organizationAddressSaveDtoToAddress(dto.address()));
        company.setPhone(dto.phone());
        company.setEmail(dto.email());
        company.setWebsite(dto.website());
        company.setDescription(dto.description());
        company.setBusinessAreas(new HashSet<>(dto.businessAreaIds().stream()
                .map(id -> businessAreaRepository.getBusinessAreaById(id)
                        .orElseThrow(() -> new BusinessAreaNotFoundException(ErrorMessages.BUSINESS_AREA_NOT_FOUND, id)))
                .toList()));
    }

    private void updateResources(Company company, Set<String> resources) {
        if (resources != null) {
            if (resources.isEmpty()) {
                company.getResources().clear();
            } else {
                company.getResources().removeIf(resource -> !resources.contains(resource.getResource()));

                for (String resource : resources) {
                    if (company.getResources().stream()
                            .noneMatch(actualResource -> actualResource.getResource().equals(resource))) {
                        Resource newResource = new Resource();
                        newResource.setResource(resource);
                        newResource.setOrganization(company);
                        company.getResources().add(newResource);
                    }
                }
            }
        }
    }

    private void updateSocialLinks(Company company, Set<String> socialLinks) {
        if (socialLinks != null) {
            if (socialLinks.isEmpty()) {
                company.getSocialLinks().clear();
            } else {
                company.getSocialLinks().removeIf(socialLink -> !socialLinks.contains(socialLink.getLink()));

                for (String link : socialLinks) {
                    if (company.getSocialLinks().stream().noneMatch(socialLink -> socialLink.getLink().equals(link))) {
                        SocialLink socialLink = new SocialLink();
                        socialLink.setLink(link);
                        socialLink.setOrganization(company);
                        company.getSocialLinks().add(socialLink);
                    }
                }
            }
        }
    }

    private Company getCompanyByIdOrThrowException(UUID id) {
        return companyRepository.getCompanyById(id)
                .orElseThrow(() -> new CompanyNotFoundException(
                        ErrorMessages.COMPANY_NOT_FOUND, id));
    }

    private void validateCreateCompany(CompanySaveDto dto) {
        organizationValidation.checkIfOrganizationNameAlreadyExists(dto.name());
        organizationValidation.checkIfOrganizationKrsAlreadyExists(dto.krs());
        organizationValidation.checkIfOrganizationNipAlreadyExists(dto.nip());
        organizationValidation.checkIfOrganizationRegonAlreadyExists(dto.regon());
    }

    private void validateUpdateCompany(CompanySaveDto dto, Company company) {
        if (!company.getName().equalsIgnoreCase(dto.name())) {
            organizationValidation.checkIfOrganizationNameAlreadyExists(dto.name());
        }
        if (!company.getKrs().equals(dto.krs())) {
            organizationValidation.checkIfOrganizationKrsAlreadyExists(dto.krs());
        }
        if (!company.getNip().equals(dto.nip())) {
            organizationValidation.checkIfOrganizationNipAlreadyExists(dto.nip());
        }
        if (!company.getRegon().equals(dto.regon())) {
            organizationValidation.checkIfOrganizationRegonAlreadyExists(dto.regon());
        }
    }

    public CompanyView getMyCopmany() {
        UUID userId = TokenUtils.getUserId(SecurityContextHolder.getContext().getAuthentication());
        User owner = userRepository.getReferenceById(userId);
        Company company = companyRepository.getCompanyByOwner(owner);
        return companyMapper.companyToCompanyView(company);
    }
}
