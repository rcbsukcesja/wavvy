package com.rcbsukcesja.hack2react.service;

import com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages;
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
import com.rcbsukcesja.hack2react.utils.TimeUtils;
import com.rcbsukcesja.hack2react.utils.TokenUtils;
import com.rcbsukcesja.hack2react.validations.DateValidation;
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
public class OrganizationNGOService {

    private final OrganizationNGOMapper organizationNGOMapper;
    private final OrganizationNGORepository organizationNGORepository;
    private final UserRepository userRepository;
    private final BusinessAreaRepository businessAreaRepository;
    private final OrganizationValidation organizationValidation;
    private final AddressMapper addressMapper;
    private final DateValidation dateValidation;

    public Page<OrganizationNGOListView> getAllNGO(Pageable pageable) {
        return organizationNGORepository.findAll(pageable)
                .map(organizationNGOMapper::organizationNGOToOrganizationNGOListView);
    }

    public OrganizationNGOView getNGOById(UUID id) {
        return organizationNGOMapper
                .organizationNGOToOrganizationNGOView(getNgoByIdOrThrowException(id));
    }

    @Transactional
    public OrganizationNGOView createNGO(OrganizationNGOSaveDto dto) {
        validateCreateNgo(dto);
        OrganizationNGO ngo = new OrganizationNGO();
        setBasicNGOFields(dto, ngo);
        ngo.setProjects(new HashSet<>());
        ngo.setResources(new HashSet<>());
        ngo.setSocialLinks(new HashSet<>());
        if (dto.confirmed() != null) {
            ngo.setConfirmed(dto.confirmed());
        } else {
            ngo.setConfirmed(false);
        }
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
        OrganizationNGO ngo = getNgoByIdOrThrowException(organizationNGOId);
        validateUpdateNgo(dto, ngo);

        setBasicNGOFields(dto, ngo);
        updateSocialLinks(ngo, dto.socialLinks());
        updateResources(ngo, dto.resources());
        updateTags(ngo, dto.tags());
        if (dto.confirmed() != null) {
            ngo.setConfirmed(dto.confirmed());
        } else {
            ngo.setConfirmed(false);
        }
        ngo.setUpdatedAt(TimeUtils.nowInUTC());

        OrganizationNGO saved = organizationNGORepository.saveAndFlush(ngo);
        return organizationNGOMapper.organizationNGOToOrganizationNGOView(saved);
    }

    @Transactional
    public OrganizationNGOView patchUpdateNGO(UUID ngoId, OrganizationNGOPatchDto dto) {
        OrganizationNGO actual = getNgoByIdOrThrowException(ngoId);
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
        if (dto.bankAccount() != null && !actual.getBankAccount().equals(dto.bankAccount())) {
            actual.setBankAccount(dto.bankAccount());
        }
        if(dto.foundetAtDate() != null & !actual.getFoundetAtDate().equals(dto.foundetAtDate())){
            dateValidation.isFoundetAtDateNotBeforeTodayDate(dto.foundetAtDate());
            actual.setFoundetAtDate(dto.foundetAtDate());
        }

        updateSocialLinks(actual, dto.socialLinks());
        updateResources(actual, dto.resources());
        updateTags(actual, dto.tags());

        if (dto.confirmed() != null && !(actual.isConfirmed() == dto.confirmed())) {
            actual.setConfirmed(dto.confirmed());
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

        if (dto.legalStatus() != null && !actual.getLegalStatus().equals(dto.legalStatus())) {
            actual.setLegalStatus(dto.legalStatus());
        }
        actual.setUpdatedAt(TimeUtils.nowInUTC());
        OrganizationNGO updated = organizationNGORepository.save(actual);
        return organizationNGOMapper.organizationNGOToOrganizationNGOView(updated);
    }

    @Transactional
    public void deleteNGO(UUID id) {
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
                    }
                }
            }
        }
    }

    private void setBasicNGOFields(OrganizationNGOSaveDto dto, OrganizationNGO ngo) {
        ngo.setName(dto.name());
        ngo.setKrs(dto.krs());
        ngo.setNip(dto.nip());
        ngo.setRegon(dto.regon());
        ngo.setOwner(userRepository.getUserById(dto.ownerId())
                .orElseThrow(() -> new UserNotFoundException(ErrorMessages.USER_NOT_FOUND, dto.ownerId())));
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
        ngo.setFoundetAtDate(dto.foundetAtDate());
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
        dateValidation.isFoundetAtDateNotBeforeTodayDate(dto.foundetAtDate());
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
        if(!ngo.getFoundetAtDate().equals(dto.foundetAtDate())){
            dateValidation.isFoundetAtDateNotBeforeTodayDate(dto.foundetAtDate());
        }
    }

    public OrganizationNGOView getMyNGO() {
        UUID userId = TokenUtils.getUserId(SecurityContextHolder.getContext().getAuthentication());
        User owner = userRepository.getReferenceById(userId);
        OrganizationNGO organizationNGO = organizationNGORepository.getOrganizationNGOByOwner(owner);
        return organizationNGOMapper.organizationNGOToOrganizationNGOView(organizationNGO);
    }
}
