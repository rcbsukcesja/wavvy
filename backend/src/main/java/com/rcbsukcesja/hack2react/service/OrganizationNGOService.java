package com.rcbsukcesja.hack2react.service;

import com.rcbsukcesja.hack2react.exceptions.badrequest.ReasonValueException;
import com.rcbsukcesja.hack2react.exceptions.forbidden.InvalidConfirmedStatusException;
import com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages;
import com.rcbsukcesja.hack2react.exceptions.messages.ForbiddenErrorMessageResources;
import com.rcbsukcesja.hack2react.exceptions.notFound.BusinessAreaNotFoundException;
import com.rcbsukcesja.hack2react.exceptions.notFound.OrganizationNGONotFoundException;
import com.rcbsukcesja.hack2react.exceptions.notFound.UserNotFoundException;
import com.rcbsukcesja.hack2react.model.dto.save.OrganizationNGOPatchDto;
import com.rcbsukcesja.hack2react.model.dto.save.OrganizationNGOSaveDto;
import com.rcbsukcesja.hack2react.model.dto.view.organization.OrganizationNGOListView;
import com.rcbsukcesja.hack2react.model.dto.view.organization.OrganizationNGOView;
import com.rcbsukcesja.hack2react.model.entity.OrganizationNGO;
import com.rcbsukcesja.hack2react.model.entity.OrganizationNGOTag;
import com.rcbsukcesja.hack2react.model.entity.Resource;
import com.rcbsukcesja.hack2react.model.entity.SocialLink;
import com.rcbsukcesja.hack2react.model.entity.User;
import com.rcbsukcesja.hack2react.model.mappers.AddressMapper;
import com.rcbsukcesja.hack2react.model.mappers.OrganizationNGOMapper;
import com.rcbsukcesja.hack2react.repositories.BusinessAreaRepository;
import com.rcbsukcesja.hack2react.repositories.OrganizationNGORepository;
import com.rcbsukcesja.hack2react.repositories.UserRepository;
import com.rcbsukcesja.hack2react.specifications.OrganizationNGOSpecifications;
import com.rcbsukcesja.hack2react.utils.AuthenticationUtils;
import com.rcbsukcesja.hack2react.utils.ConfirmedStatusUtils;
import com.rcbsukcesja.hack2react.utils.TimeUtils;
import com.rcbsukcesja.hack2react.utils.TokenUtils;
import com.rcbsukcesja.hack2react.validations.DateValidation;
import com.rcbsukcesja.hack2react.validations.OrganizationValidation;
import com.rcbsukcesja.hack2react.validations.UserValidation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrganizationNGOService {

    private final static String NAME = "name";
    private final static String NIP = "nip";
    private final static String KRS = "krs";
    private final static String REGON = "regon";

    private final OrganizationNGOMapper organizationNGOMapper;
    private final OrganizationNGORepository organizationNGORepository;
    private final UserRepository userRepository;
    private final BusinessAreaRepository businessAreaRepository;
    private final OrganizationValidation organizationValidation;
    private final AddressMapper addressMapper;
    private final DateValidation dateValidation;
    private final UserValidation userValidation;

    public Page<OrganizationNGOListView> getAllNGO(String search, Pageable pageable, Authentication authentication) {
        log.info("getAllNGO(search: {})", search);
        Specification<OrganizationNGO> spec = Specification.where(null);

        if (authentication == null || !AuthenticationUtils.hasRole(authentication, "ROLE_CITY_HALL")) {
            spec = OrganizationNGOSpecifications.isNotDisabledAndConfirmed();
        }

        if (search != null && !search.isEmpty()) {
            spec = spec.and(OrganizationNGOSpecifications.nameOrTagsOrResourcesContain(search));
        }

        return organizationNGORepository.findAll(spec, pageable)
                .map(organizationNGOMapper::organizationNGOToOrganizationNGOListView);
    }

    public OrganizationNGOView getNGOById(UUID id) {
        log.info("getNGOById( id: {})", id);
        return organizationNGOMapper
                .organizationNGOToOrganizationNGOView(getNgoByIdOrThrowException(id));
    }

    @Transactional
    public OrganizationNGOView createNGO(OrganizationNGOSaveDto dto) {
        log.info("createNGO( dto: {})", dto);
        validateCreateNgo(dto);
        OrganizationNGO ngo = new OrganizationNGO();
        setOfficialNGOFields(dto, ngo);
        setBasicNGOFields(dto, ngo);
        ngo.setProjects(new HashSet<>());
        ngo.setResources(new HashSet<>());
        ngo.setSocialLinks(new HashSet<>());
        ngo.setConfirmed(false);
        ngo.setDisabled(false);
        ngo = organizationNGORepository.save(ngo);

        if (dto.socialLinks() != null && !dto.socialLinks().isEmpty()) {
            Set<SocialLink> socialLinks = new HashSet<>();
            for (String link : dto.socialLinks()) {
                SocialLink socialLink = new SocialLink();
                socialLink.setId(UUID.randomUUID());
                socialLink.setLink(link);
                socialLink.setOrganization(ngo);
                socialLinks.add(socialLink);
            }
            ngo.setSocialLinks(socialLinks);

        }

        if (dto.resources() != null && !dto.resources().isEmpty()) {
            Set<Resource> resources = new HashSet<>();
            for (String resource : dto.resources()) {
                Resource newResource = new Resource();
                newResource.setId(UUID.randomUUID());
                newResource.setResource(resource);
                newResource.setOrganization(ngo);
                resources.add(newResource);
            }
            ngo.setResources(resources);

        }
        if (dto.tags() != null && !dto.tags().isEmpty()) {
            Set<OrganizationNGOTag> tags = new HashSet<>();
            for (String tag : dto.tags()) {
                OrganizationNGOTag newTag = new OrganizationNGOTag();
                newTag.setId(UUID.randomUUID());
                newTag.setTag(tag);
                newTag.setOrganizationNgo(ngo);
                tags.add(newTag);
            }
            ngo.setTags(tags);
        }
        ngo.setCreatedAt(TimeUtils.nowInUTC());
        ngo.setUpdatedAt(ngo.getCreatedAt());
        ngo = organizationNGORepository.saveAndFlush(ngo);

        return organizationNGOMapper.organizationNGOToOrganizationNGOView(ngo);
    }

    @Transactional
    public OrganizationNGOView putUpdateNGO(UUID organizationNGOId, OrganizationNGOSaveDto dto) {
        log.info("putUpdateNGO( organizationNGOId: {}, dto: {})", organizationNGOId, dto);
        OrganizationNGO ngo = getNgoByIdOrThrowException(organizationNGOId);
        validateUpdateNgo(dto, ngo);

        if (ConfirmedStatusUtils.checkUserCanChangeFields(ngo.isConfirmed())) {
            setOfficialNGOFields(dto, ngo);
        } else {
            throwExceptionOnPutUpdateOfficialFieldWithInvalidConfirmedStatus(dto, ngo);
            setOfficialNGOFields(dto, ngo);
        }

        setBasicNGOFields(dto, ngo);

        if (dto.disabled() != null) {
            AuthenticationUtils.checkIfCityUser(SecurityContextHolder.getContext().getAuthentication(),
                    ForbiddenErrorMessageResources.DISABLED);
            if (dto.disabled()) {
                if (dto.reason() == null) {
                    throw new ReasonValueException(ErrorMessages.REASON_MUST_NOT_BE_NULL);
                }
            }
            ngo.setDisabled(dto.disabled());
        }
        if (dto.reason() != null && !dto.reason().equals(ngo.getReason())) {
            AuthenticationUtils.checkIfCityUser(SecurityContextHolder.getContext().getAuthentication(),
                    ForbiddenErrorMessageResources.REASON);
            ngo.setReason(dto.reason());
        }
        updateSocialLinks(ngo, dto.socialLinks());
        updateResources(ngo, dto.resources());
        updateTags(ngo, dto.tags());
        if (dto.confirmed() != null) {
            AuthenticationUtils.checkIfCityUser(SecurityContextHolder.getContext().getAuthentication(),
                    ForbiddenErrorMessageResources.CONFIRMED);
            organizationValidation.validateOfficialOrganizationFieldsDuringConfirmation(ngo);
            ngo.setConfirmed(dto.confirmed());
        }
        ngo.setUpdatedAt(TimeUtils.nowInUTC());

        OrganizationNGO saved = organizationNGORepository.saveAndFlush(ngo);
        return organizationNGOMapper.organizationNGOToOrganizationNGOView(saved);
    }

    @Transactional
    public OrganizationNGOView patchUpdateNGO(UUID ngoId, OrganizationNGOPatchDto dto) {
        log.info("patchUpdateNGO( ngoId: {}, dto: {})", ngoId, dto);
        OrganizationNGO actual = getNgoByIdOrThrowException(ngoId);

        if(!AuthenticationUtils.isCityUser(SecurityContextHolder.getContext().getAuthentication())){
            userValidation.checkIfIsOwner(actual.getOwner().getId());
        }

        boolean userCanChangeOfficialFields = ConfirmedStatusUtils.checkUserCanChangeFields(actual.isConfirmed());
        if (dto.name() != null && !actual.getName().equals(dto.name())) {
            if (actual.getName().equalsIgnoreCase(dto.name())) {
                actual.setName(dto.name());
            } else {
                organizationValidation.checkIfOrganizationNameAlreadyExists(dto.name());
                if (userCanChangeOfficialFields) {
                    actual.setName(dto.name());
                } else {
                    throw new InvalidConfirmedStatusException(ErrorMessages.FORBIDDEN_MODIFICATION, NAME);
                }
            }
        }
        if (dto.krs() != null && !dto.krs().equals(actual.getKrs())) {
            organizationValidation.checkIfOrganizationKrsAlreadyExists(dto.krs());
            if (userCanChangeOfficialFields) {
                actual.setKrs(dto.krs());
            } else {
                throw new InvalidConfirmedStatusException(ErrorMessages.FORBIDDEN_MODIFICATION, KRS);
            }
        }
        if (dto.nip() != null && !dto.nip().equals(actual.getNip())) {
            organizationValidation.checkIfOrganizationNipAlreadyExists(dto.nip());
            if (userCanChangeOfficialFields) {
                actual.setNip(dto.nip());
            } else {
                throw new InvalidConfirmedStatusException(ErrorMessages.FORBIDDEN_MODIFICATION, NIP);
            }
        }
        if (dto.regon() != null && !dto.regon().equals(actual.getRegon())) {
            organizationValidation.checkIfOrganizationRegonAlreadyExists(dto.regon());
            if (userCanChangeOfficialFields) {
                actual.setRegon(dto.regon());
            } else {
                throw new InvalidConfirmedStatusException(ErrorMessages.FORBIDDEN_MODIFICATION, REGON);
            }
        }
        if (dto.address() != null && !addressMapper.organizationAddressPatchDtoToAddress(dto.address()).equals(actual.getAddress())) {
            actual.setAddress(addressMapper.organizationAddressPatchDtoToAddress(dto.address()));
        }
        if (dto.phone() != null && !dto.phone().equals(actual.getPhone())) {
            actual.setPhone(dto.phone());
        }
        if (dto.email() != null && !dto.email().equals(actual.getEmail())) {
            actual.setEmail(dto.email());
        }
        if (dto.website() != null && !dto.website().equals(actual.getWebsite())) {
            actual.setWebsite(dto.website());
        }
        if (dto.bankAccount() != null && !dto.bankAccount().equals(actual.getBankAccount())) {
            actual.setBankAccount(dto.bankAccount());
        }
        if (dto.foundedAt() != null && !dto.foundedAt().equals(actual.getFoundedAt())) {
            dateValidation.isFoundedAtDateNotBeforeTodayDate(dto.foundedAt());
            actual.setFoundedAt(dto.foundedAt());
        }

        updateSocialLinks(actual, dto.socialLinks());
        updateResources(actual, dto.resources());
        updateTags(actual, dto.tags());

        if (dto.confirmed() != null && !dto.confirmed() == actual.isConfirmed()) {
            AuthenticationUtils.checkIfCityUser(SecurityContextHolder.getContext().getAuthentication(),
                    ForbiddenErrorMessageResources.CONFIRMED);
            organizationValidation.validateOfficialOrganizationFieldsDuringConfirmation(actual);
            actual.setConfirmed(dto.confirmed());
        }

        if (dto.description() != null && !dto.description().equals(actual.getDescription())) {
            actual.setDescription(dto.description());
        }
        if (dto.businessAreaIds() != null) {
            actual.setBusinessAreas(new HashSet<>(dto.businessAreaIds().stream()
                    .map(id -> businessAreaRepository.getBusinessAreaById(id)
                            .orElseThrow(() -> new BusinessAreaNotFoundException(ErrorMessages.BUSINESS_AREA_NOT_FOUND, id)))
                    .toList()));
        }

        if (dto.legalStatus() != null && !dto.legalStatus().equals(actual.getLegalStatus())) {
            actual.setLegalStatus(dto.legalStatus());
        }
        if (dto.disabled() != null) {
            AuthenticationUtils.checkIfCityUser(SecurityContextHolder.getContext().getAuthentication(),
                    ForbiddenErrorMessageResources.DISABLED);
            if (dto.disabled()) {
                if (dto.reason() == null) {
                    throw new ReasonValueException(ErrorMessages.REASON_MUST_NOT_BE_NULL);
                }
            }
            actual.setDisabled(dto.disabled());
        }
        if (dto.reason() != null && !dto.reason().equals(actual.getReason())) {
            AuthenticationUtils.checkIfCityUser(SecurityContextHolder.getContext().getAuthentication(),
                    ForbiddenErrorMessageResources.REASON);
            actual.setReason(dto.reason());
        }
        actual.setUpdatedAt(TimeUtils.nowInUTC());
        OrganizationNGO updated = organizationNGORepository.save(actual);
        return organizationNGOMapper.organizationNGOToOrganizationNGOView(updated);
    }

    @Transactional
    public void deleteNGO(UUID id) {
        log.info("deleteNGO(id: {})", id);
        OrganizationNGO ngo = getNgoByIdOrThrowException(id);
        organizationNGORepository.delete(ngo);
    }

    private void updateTags(OrganizationNGO ngo, Set<String> tags) {
        if (tags != null) {
            if (ngo.getTags() == null) {
                ngo.setTags(new HashSet<>());
            }
            if (tags.isEmpty()) {
                ngo.getTags().clear();
            } else {
                ngo.getTags().removeIf(resource -> !tags.contains(resource.getTag()));

                for (String tag : tags) {
                    if (ngo.getTags().stream()
                            .noneMatch(actualResource -> actualResource.getTag().equals(tag))) {
                        OrganizationNGOTag newTag = new OrganizationNGOTag();
                        newTag.setId(UUID.randomUUID());
                        newTag.setTag(tag);
                        newTag.setOrganizationNgo(ngo);
                        ngo.getTags().add(newTag);
                        organizationNGORepository.save(ngo);
                    }
                }
            }
        }
    }

    private void updateResources(OrganizationNGO ngo, Set<String> resources) {
        if (resources != null) {
            if (ngo.getResources() == null) {
                ngo.setResources(new HashSet<>());
            }
            if (resources.isEmpty()) {
                ngo.getResources().clear();
            } else {
                ngo.getResources().removeIf(resource -> !resources.contains(resource.getResource()));

                for (String resource : resources) {
                    if (ngo.getResources().stream()
                            .noneMatch(actualResource -> actualResource.getResource().equals(resource))) {
                        Resource newResource = new Resource();
                        newResource.setId(UUID.randomUUID());
                        newResource.setResource(resource);
                        newResource.setOrganization(ngo);
                        ngo.getResources().add(newResource);
                        organizationNGORepository.save(ngo);
                    }
                }
            }
        }
    }

    private void updateSocialLinks(OrganizationNGO ngo, Set<String> socialLinks) {
        if (socialLinks != null) {
            if (ngo.getSocialLinks() == null) {
                ngo.setSocialLinks(new HashSet<>());
            }
            if (socialLinks.isEmpty()) {
                ngo.getSocialLinks().clear();
            } else {
                ngo.getSocialLinks().removeIf(socialLink -> !socialLinks.contains(socialLink.getLink()));

                for (String link : socialLinks) {
                    if (ngo.getSocialLinks().stream().noneMatch(socialLink -> socialLink.getLink().equals(link))) {
                        SocialLink socialLink = new SocialLink();
                        socialLink.setId(UUID.randomUUID());
                        socialLink.setLink(link);
                        socialLink.setOrganization(ngo);
                        ngo.getSocialLinks().add(socialLink);
                        organizationNGORepository.save(ngo);
                    }
                }
            }
        }
    }

    private void setOfficialNGOFields(OrganizationNGOSaveDto dto, OrganizationNGO ngo) {
        ngo.setName(dto.name());
        ngo.setKrs(dto.krs());
        ngo.setNip(dto.nip());
        ngo.setRegon(dto.regon());
    }

    private void setBasicNGOFields(OrganizationNGOSaveDto dto, OrganizationNGO ngo) {
        ngo.setOwner(getUserByIdOrThrowException(TokenUtils.getUserId(SecurityContextHolder.getContext().getAuthentication())));
        ngo.setAddress(addressMapper.organizationAddressSaveDtoToAddress(dto.address()));
        ngo.setPhone(dto.phone());
        ngo.setEmail(dto.email());
        ngo.setWebsite(dto.website());
        ngo.setDescription(dto.description());
        ngo.setLegalStatus(dto.legalStatus());
        ngo.setBusinessAreas(new HashSet<>(dto.businessAreaIds().stream()
                .map(id -> businessAreaRepository.getBusinessAreaById(id)
                        .orElseThrow(() -> new BusinessAreaNotFoundException(ErrorMessages.BUSINESS_AREA_NOT_FOUND, id)))
                .toList()));
        ngo.setBankAccount(dto.bankAccount());
        ngo.setFoundedAt(dto.foundedAt());
    }

    private OrganizationNGO getNgoByIdOrThrowException(UUID id) {
        return organizationNGORepository.getOrganizationNGOById(id)
                .orElseThrow(() -> new OrganizationNGONotFoundException(
                        ErrorMessages.ORGANIZATION_NGO_NOT_FOUND, id));
    }

    private void validateCreateNgo(OrganizationNGOSaveDto dto) {
        organizationValidation.checkIfOrganizationNameAlreadyExists(dto.name());
        organizationValidation.checkIfOrganizationKrsAlreadyExists(dto.krs());
        organizationValidation.checkIfOrganizationNipAlreadyExists(dto.nip());
        organizationValidation.checkIfOrganizationRegonAlreadyExists(dto.regon());
        dateValidation.isFoundedAtDateNotBeforeTodayDate(dto.foundedAt());
    }

    private void validateUpdateNgo(OrganizationNGOSaveDto dto, OrganizationNGO ngo) {
        if (!ngo.getName().equalsIgnoreCase(dto.name())) {
            organizationValidation.checkIfOrganizationNameAlreadyExists(dto.name());
        }
        if (!ngo.getKrs().equals(dto.krs())) {
            organizationValidation.checkIfOrganizationKrsAlreadyExists(dto.krs());
        }
        if (!ngo.getNip().equals(dto.nip())) {
            organizationValidation.checkIfOrganizationNipAlreadyExists(dto.nip());
        }
        if (!ngo.getRegon().equals(dto.regon())) {
            organizationValidation.checkIfOrganizationRegonAlreadyExists(dto.regon());
        }
        if (!ngo.getFoundedAt().equals(dto.foundedAt())) {
            dateValidation.isFoundedAtDateNotBeforeTodayDate(dto.foundedAt());
        }
    }

    public OrganizationNGOView getMyNGO() {
        log.info("getMyNgo()");
        UUID userId = TokenUtils.getUserId(SecurityContextHolder.getContext().getAuthentication());
        User owner = getUserByIdOrThrowException(userId);
        OrganizationNGO organizationNGO = organizationNGORepository.getOrganizationNGOByOwner(owner);
        return organizationNGOMapper.organizationNGOToOrganizationNGOView(organizationNGO);
    }

    private User getUserByIdOrThrowException(UUID id) {
        return userRepository.getUserById(id)
                .orElseThrow(() -> new UserNotFoundException(ErrorMessages.USER_NOT_FOUND, id));
    }

    private void throwExceptionOnPutUpdateOfficialFieldWithInvalidConfirmedStatus(OrganizationNGOSaveDto dto, OrganizationNGO ngo) {
        if (dto.name()!= null && !dto.name().equals(ngo.getName())) {
            throw new InvalidConfirmedStatusException(ErrorMessages.FORBIDDEN_MODIFICATION, NAME);
        }
        if (dto.krs()!= null && !dto.krs().equals(ngo.getKrs())) {
            throw new InvalidConfirmedStatusException(ErrorMessages.FORBIDDEN_MODIFICATION, KRS);
        }
        if (dto.regon()!= null && !dto.regon().equals(ngo.getRegon())) {
            throw new InvalidConfirmedStatusException(ErrorMessages.FORBIDDEN_MODIFICATION, REGON);
        }
        if (dto.nip()!= null && !dto.nip().equals(ngo.getNip())) {
            throw new InvalidConfirmedStatusException(ErrorMessages.FORBIDDEN_MODIFICATION, NIP);
        }
    }
}
