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
import com.rcbsukcesja.hack2react.model.entity.Resource;
import com.rcbsukcesja.hack2react.model.entity.SocialLink;
import com.rcbsukcesja.hack2react.model.mappers.OrganizationNGOMapper;
import com.rcbsukcesja.hack2react.repositories.BusinessAreaRepository;
import com.rcbsukcesja.hack2react.repositories.OrganizationNGORepository;
import com.rcbsukcesja.hack2react.repositories.UserRepository;
import com.rcbsukcesja.hack2react.utils.FileUtils;
import com.rcbsukcesja.hack2react.utils.TimeUtils;
import com.rcbsukcesja.hack2react.validations.OrganizationNgoValidation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrganizationNGOService {

    private final OrganizationNGOMapper organizationNGOMapper;
    private final OrganizationNGORepository organizationNGORepository;
    private final UserRepository userRepository;
    private final BusinessAreaRepository businessAreaRepository;
    private final OrganizationNgoValidation organizationNgoValidation;

    public List<OrganizationNGOListView> getAllNGO() {
        return organizationNGORepository.getAll().stream()
                .map(organizationNGOMapper::organizationNGOToOrganizationNGOListView).toList();
    }

    public OrganizationNGOView getNGOById(UUID id) {
        return organizationNGOMapper
                .organizationNGOToOrganizationNGOView(getNgoByIdOrThrowException(id));
    }

    @Transactional
    public OrganizationNGOView saveNGO(UUID organizationNGOId, OrganizationNGOSaveDto dto) {
        OrganizationNGO ngo;
        if (organizationNGOId == null) {
            validateCreateNgo(dto);
            ngo = new OrganizationNGO();
            ngo.setProjects(new HashSet<>());
            if (dto.resources() != null && !dto.resources().isEmpty()) {
                for (String resource : dto.resources()) {
                    Resource newResource = new Resource();
                    newResource.setResource(resource);
                    ngo.getResources().add(newResource);
                    organizationNGORepository.save(ngo);
                }
            }
            ngo.setSocialLinks(new HashSet<>());
            if (dto.socialLinks() != null && !dto.socialLinks().isEmpty()) {
                for (String link : dto.socialLinks()) {
                    SocialLink socialLink = new SocialLink();
                    socialLink.setLink(link);
                    ngo.getSocialLinks().add(socialLink);
                    organizationNGORepository.save(ngo);
                }
            }
        } else {
            ngo = getNgoByIdOrThrowException(organizationNGOId);
            validateUpdateNgo(dto, ngo);
            updateSocialLinks(ngo, dto.socialLinks());
            updateResources(ngo, dto.resources());
        }

        ngo.setName(dto.name());
        ngo.setKrs(dto.krs());
        ngo.setNip(dto.nip());
        ngo.setRegon(dto.regon());
        ngo.setOwner(userRepository.getUserById(dto.ownerId())
                .orElseThrow(() -> new UserNotFoundException(ErrorMessages.USER_NOT_FOUND, dto.ownerId())));
        ngo.setAddress(dto.address());
        ngo.setPhone(dto.phone());
        ngo.setEmail(dto.email());
        ngo.setWebsite(dto.website());
        ngo.setDescription(dto.description());
        ngo.setLegalStatus(dto.legalStatus());
        ngo.setBusinessAreas(new HashSet<>(dto.businessAreaIds().stream()
                .map(id -> businessAreaRepository.getBusinessAreaById(id)
                        .orElseThrow(() -> new BusinessAreaNotFoundException(ErrorMessages.BUSINESS_AREA_NOT_FOUND, id)))
                .toList()));
        ngo.setCreationTime(TimeUtils.nowInUTC());
        ngo.setResources(new HashSet<>());

        OrganizationNGO saved = organizationNGORepository.save(ngo);
        return organizationNGOMapper.organizationNGOToOrganizationNGOView(saved);
    }

    @Transactional
    public OrganizationNGOView updateNGO(UUID ngoId, OrganizationNGOPatchDto dto) {
        OrganizationNGO actual = getNgoByIdOrThrowException(ngoId);
        if (dto.name() != null && !actual.getName().equals(dto.name())) {
            if (actual.getName().equalsIgnoreCase(dto.name())) {
                actual.setName(dto.name());
            } else {
                organizationNgoValidation.checkIfNgoNameAlreadyExists(dto.name());
                actual.setName(dto.name());
            }
        }
        if (dto.krs() != null && !actual.getKrs().equals(dto.krs())) {
            organizationNgoValidation.checkIfNgoKrsAlreadyExists(dto.krs());
            actual.setKrs(dto.krs());
        }
        if (dto.nip() != null && !actual.getNip().equals(dto.nip())) {
            organizationNgoValidation.checkIfNgoNipAlreadyExists(dto.nip());
            actual.setNip(dto.nip());
        }
        if (dto.regon() != null && !actual.getRegon().equals(dto.regon())) {
            organizationNgoValidation.checkIfNgoRegonAlreadyExists(dto.regon());
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
        if (dto.legalStatus() != null && !actual.getLegalStatus().equals(dto.legalStatus())) {
            actual.setLegalStatus(dto.legalStatus());
        }
        OrganizationNGO updated = organizationNGORepository.save(actual);
        return organizationNGOMapper.organizationNGOToOrganizationNGOView(updated);
    }

    @Transactional
    public void deleteNGO(UUID id) {
        OrganizationNGO ngo = getNgoByIdOrThrowException(id);
        organizationNGORepository.delete(ngo);
    }

    @Transactional
    public void updateLogoPath(String fileExtension, UUID ngoId) {
        OrganizationNGO ngo = getNgoByIdOrThrowException(ngoId);
        ngo.setLogoPath(FileUtils.getPathAsString(fileExtension, ngoId.toString(), "logo"));
        organizationNGORepository.save(ngo);
    }

    @Transactional
    public String removeLogoPath(UUID ngoId) {
        OrganizationNGO ngo = getNgoByIdOrThrowException(ngoId);
        String filePath = ngo.getLogoPath();
        ngo.setLogoPath(null);
        organizationNGORepository.save(ngo);
        return filePath;
    }

    private void updateResources(OrganizationNGO ngo, Set<String> resources) {
        if (resources != null) {
            if (resources.isEmpty()) {
                ngo.getResources().clear();
            } else {
                ngo.getResources().removeIf(resource -> !resources.contains(resource.getResource()));

                for (String resource : resources) {
                    if (ngo.getResources().stream()
                            .noneMatch(actualResource -> actualResource.getResource().equals(resource))) {
                        Resource newResource = new Resource();
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
            if (socialLinks.isEmpty()) {
                ngo.getSocialLinks().clear();
            } else {
                ngo.getSocialLinks().removeIf(socialLink -> !socialLinks.contains(socialLink.getLink()));

                for (String link : socialLinks) {
                    if (ngo.getSocialLinks().stream().noneMatch(socialLink -> socialLink.getLink().equals(link))) {
                        SocialLink socialLink = new SocialLink();
                        socialLink.setLink(link);
                        socialLink.setOrganization(ngo);
                        ngo.getSocialLinks().add(socialLink);
                        organizationNGORepository.save(ngo);
                    }
                }
            }
        }
    }

    private OrganizationNGO getNgoByIdOrThrowException(UUID id) {
        return organizationNGORepository.getOrganizationNGOById(id)
                .orElseThrow(() -> new OrganizationNGONotFoundException(
                        ErrorMessages.ORGANIZATION_NGO_NOT_FOUND, id));
    }

    private Set<OrganizationNGO> getNgoSetOrThrowException(Set<UUID> organizersIds) {
        return new HashSet<>(organizersIds.stream()
                .map(this::getNgoByIdOrThrowException)
                .toList());
    }

    private void validateCreateNgo(OrganizationNGOSaveDto dto) {
        organizationNgoValidation.checkIfNgoNameAlreadyExists(dto.name());
        organizationNgoValidation.checkIfNgoKrsAlreadyExists(dto.krs());
        organizationNgoValidation.checkIfNgoNipAlreadyExists(dto.nip());
        organizationNgoValidation.checkIfNgoRegonAlreadyExists(dto.regon());
    }

    private void validateUpdateNgo(OrganizationNGOSaveDto dto, OrganizationNGO ngo) {
        if (!ngo.getName().equalsIgnoreCase(dto.name())) {
            organizationNgoValidation.checkIfNgoNameAlreadyExists(dto.name());
        }
        if (!ngo.getKrs().equals(dto.krs())) {
            organizationNgoValidation.checkIfNgoKrsAlreadyExists(dto.krs());
        }
        if (!ngo.getNip().equals(dto.nip())) {
            organizationNgoValidation.checkIfNgoNipAlreadyExists(dto.nip());
        }
        if (!ngo.getRegon().equals(dto.regon())) {
            organizationNgoValidation.checkIfNgoRegonAlreadyExists(dto.regon());
        }
    }

}
