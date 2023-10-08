package com.rcbsukcesja.hack2react.service;

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
import com.rcbsukcesja.hack2react.model.mappers.CompanyMapper;
import com.rcbsukcesja.hack2react.repositories.BusinessAreaRepository;
import com.rcbsukcesja.hack2react.repositories.CompanyRepository;
import com.rcbsukcesja.hack2react.repositories.UserRepository;
import com.rcbsukcesja.hack2react.utils.TimeUtils;
import com.rcbsukcesja.hack2react.validations.CompanyValidation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final CompanyMapper companyMapper;
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;
    private final BusinessAreaRepository businessAreaRepository;
    private final CompanyValidation companyValidation;

    public List<CompanyListView> getAllCompany() {
        return companyRepository.getAll().stream()
                .map(companyMapper::companyToCompanyListView).toList();
    }

    public CompanyView getCompanyById(UUID id) {
        return companyMapper
                .companyToCompanyView(getCompanyByIdOrThrowException(id));
    }

    @Transactional
    public CompanyView createOrUpdateCompany(UUID companyId, CompanySaveDto dto) {
        Company company;
        if (companyId == null) {
            validateCreateCompany(dto);
            company = new Company();
            if (dto.resources() != null && !dto.resources().isEmpty()) {
                for (String resource : dto.resources()) {
                    Resource newResource = new Resource();
                    newResource.setResource(resource);
                    company.getResources().add(newResource);
                    companyRepository.save(company);
                }
            }
            company.setSocialLinks(new HashSet<>());
            if (dto.socialLinks() != null && !dto.socialLinks().isEmpty()) {
                for (String link : dto.socialLinks()) {
                    SocialLink socialLink = new SocialLink();
                    socialLink.setLink(link);
                    company.getSocialLinks().add(socialLink);
                    companyRepository.save(company);
                }
            }
        } else {
            company = getCompanyByIdOrThrowException(companyId);
            validateUpdateCompany(dto, company);
            updateSocialLinks(company, dto.socialLinks());
            updateResources(company, dto.resources());
        }

        company.setName(dto.name());
        company.setKrs(dto.krs());
        company.setNip(dto.nip());
        company.setRegon(dto.regon());
        company.setOwner(userRepository.getUserById(dto.ownerId())
                .orElseThrow(() -> new UserNotFoundException(ErrorMessages.USER_NOT_FOUND, dto.ownerId())));
        company.setAddress(dto.address());
        company.setPhone(dto.phone());
        company.setEmail(dto.email());
        company.setWebsite(dto.website());
        company.setDescription(dto.description());
        company.setBusinessAreas(new HashSet<>(dto.businessAreaIds().stream()
                .map(id -> businessAreaRepository.getBusinessAreaById(id)
                        .orElseThrow(() -> new BusinessAreaNotFoundException(ErrorMessages.BUSINESS_AREA_NOT_FOUND, id)))
                .toList()));
        company.setCreationTime(TimeUtils.now());
        company.setResources(new HashSet<>());

        Company saved = companyRepository.save(company);
        return companyMapper.companyToCompanyView(saved);
    }

    @Transactional
    public CompanyView updateCompany(UUID companyId, CompanyPatchDto dto) {
        Company actual = getCompanyByIdOrThrowException(companyId);
        if (dto.name() != null && !actual.getName().equals(dto.name())) {
            if (actual.getName().equalsIgnoreCase(dto.name())) {
                actual.setName(dto.name());
            } else {
                companyValidation.checkIfCompanyNameAlreadyExists(dto.name());
                actual.setName(dto.name());
            }
        }
        if (dto.krs() != null && !actual.getKrs().equals(dto.krs())) {
            companyValidation.checkIfCompanyKrsAlreadyExists(dto.krs());
            actual.setKrs(dto.krs());
        }
        if (dto.nip() != null && !actual.getNip().equals(dto.nip())) {
            companyValidation.checkIfCompanyNipAlreadyExists(dto.nip());
            actual.setNip(dto.nip());
        }
        if (dto.regon() != null && !actual.getRegon().equals(dto.regon())) {
            companyValidation.checkIfCompanyRegonAlreadyExists(dto.regon());
            actual.setRegon(dto.regon());
        }
        if (dto.ownerId() != null && !actual.getOwner().getId().equals(dto.ownerId())) {
            actual.setOwner(userRepository.getUserById(dto.ownerId())
                    .orElseThrow(() -> new UserNotFoundException(ErrorMessages.USER_NOT_FOUND, dto.ownerId())));
        }
        if (dto.address() != null && !actual.getAddress().equals(dto.address())) {
            actual.setAddress(dto.address());
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

        updateSocialLinks(actual, dto.socialLinks());

        if (dto.description() != null && !actual.getDescription().equals(dto.description())) {
            actual.setDescription(dto.description());
        }
        if (dto.businessAreaIds() != null) {
            actual.setBusinessAreas(new HashSet<>(dto.businessAreaIds().stream()
                    .map(id -> businessAreaRepository.getBusinessAreaById(id)
                            .orElseThrow(() -> new BusinessAreaNotFoundException(ErrorMessages.BUSINESS_AREA_NOT_FOUND, id)))
                    .toList()));
        }
        updateResources(actual, dto.resources());

        Company updated = companyRepository.save(actual);
        return companyMapper.companyToCompanyView(updated);
    }

    @Transactional
    public void deleteCompany(UUID id) {
        Company company = getCompanyByIdOrThrowException(id);
        companyRepository.delete(company);
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
                        companyRepository.save(company);
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
                        companyRepository.save(company);
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

    private Set<Company> getCompanySetOrThrowException(Set<UUID> organizersIds) {
        return new HashSet<>(organizersIds.stream()
                .map(this::getCompanyByIdOrThrowException)
                .toList());
    }

    private void validateCreateCompany(CompanySaveDto dto) {
        companyValidation.checkIfCompanyNameAlreadyExists(dto.name());
        companyValidation.checkIfCompanyKrsAlreadyExists(dto.krs());
        companyValidation.checkIfCompanyNipAlreadyExists(dto.nip());
        companyValidation.checkIfCompanyRegonAlreadyExists(dto.regon());
    }

    private void validateUpdateCompany(CompanySaveDto dto, Company company) {
        if (!company.getName().equalsIgnoreCase(dto.name())) {
            companyValidation.checkIfCompanyNameAlreadyExists(dto.name());
        }
        if (!company.getKrs().equals(dto.krs())) {
            companyValidation.checkIfCompanyKrsAlreadyExists(dto.krs());
        }
        if (!company.getNip().equals(dto.nip())) {
            companyValidation.checkIfCompanyNipAlreadyExists(dto.nip());
        }
        if (!company.getRegon().equals(dto.regon())) {
            companyValidation.checkIfCompanyRegonAlreadyExists(dto.regon());
        }
    }

}
