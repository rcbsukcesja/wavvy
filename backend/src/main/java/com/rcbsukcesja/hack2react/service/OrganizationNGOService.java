package com.rcbsukcesja.hack2react.service;

import com.rcbsukcesja.hack2react.exceptions.alreadyExists.OrganizationNGOAlreadyExistsException;
import com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages;
import com.rcbsukcesja.hack2react.exceptions.notFound.BusinessAreaNotFoundException;
import com.rcbsukcesja.hack2react.exceptions.notFound.OrganizationNGONotFoundException;
import com.rcbsukcesja.hack2react.exceptions.notFound.UserNotFoundException;
import com.rcbsukcesja.hack2react.model.dto.save.OrganizationNGODto;
import com.rcbsukcesja.hack2react.model.dto.view.organization.OrganizationNGOView;
import com.rcbsukcesja.hack2react.model.entity.OrganizationNGO;
import com.rcbsukcesja.hack2react.model.mappers.OrganizationNGOMapper;
import com.rcbsukcesja.hack2react.repositories.BusinessAreaRepository;
import com.rcbsukcesja.hack2react.repositories.OrganizationNGORepository;
import com.rcbsukcesja.hack2react.repositories.UserRepository;
import com.rcbsukcesja.hack2react.utils.TimeUtils;
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

    public List<OrganizationNGOView> getAllNGO() {
        return organizationNGORepository.findAll().stream()
                .map(organizationNGOMapper::organizationNGOToOrganizationNGOView).toList();
    }

    public OrganizationNGOView getNGOById(UUID id) {
        return organizationNGOMapper
                .organizationNGOToOrganizationNGOView(getNGOByIdOrThrowException(id));
    }

    @Transactional
    public OrganizationNGOView createNGO(OrganizationNGODto dto) {
        validateNGO(dto);
        OrganizationNGO ngo = organizationNGOMapper.organizationNGODtoToOrganizationNGO(dto);
        ngo.setProjects(new HashSet<>());
        ngo.setCreationTime(TimeUtils.now());
        OrganizationNGO saved = organizationNGORepository.save(ngo);
        return organizationNGOMapper.organizationNGOToOrganizationNGOView(saved);
    }

    @Transactional
    public OrganizationNGOView updateNGO(UUID ngoId, OrganizationNGODto dto) {
        OrganizationNGO actual = getNGOByIdOrThrowException(ngoId);
        if (dto.name() != null && !actual.getName().equalsIgnoreCase(dto.name())) {
            checkIfNGONameAlreadyExists(dto.name());
            actual.setName(dto.name());
        }
        if (dto.KRS() != null && !actual.getKRS().equals(dto.KRS())) {
            checkIfNGOKRSAlreadyExists(dto.KRS());
            actual.setKRS(dto.KRS());
        }
        if (dto.NIP() != null && !actual.getNIP().equals(dto.NIP())) {
            checkIfNGONIPAlreadyExists(dto.NIP());
            actual.setNIP(dto.NIP());
        }
        if (dto.REGON() != null && !actual.getREGON().equals(dto.REGON())) {
            checkIfNGOREGONAlreadyExists(dto.REGON());
            actual.setREGON(dto.REGON());
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
        if (dto.socialLinks() != null) {
            actual.setSocialLinks(dto.socialLinks());
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
        if (dto.resources() != null) {
            actual.setResources(dto.resources());
        }
        if (dto.legalStatus() != null && !actual.getLegalStatus().equals(dto.legalStatus())) {
            actual.setLegalStatus(dto.legalStatus());
        }
        OrganizationNGO updated = organizationNGORepository.save(actual);
        return organizationNGOMapper.organizationNGOToOrganizationNGOView(updated);
    }

    @Transactional
    public void deleteNGO(UUID id) {
        OrganizationNGO ngo = getNGOByIdOrThrowException(id);
        organizationNGORepository.delete(ngo);
    }

    public OrganizationNGO getNGOByIdOrThrowException(UUID id) {
        return organizationNGORepository.getOrganizationNGOById(id)
                .orElseThrow(() -> new OrganizationNGONotFoundException(
                        ErrorMessages.ORGANIZATION_NGO_NOT_FOUND, id));
    }

    public Set<OrganizationNGO> getNGOsOrThrowException(Set<UUID> organizersIds) {
        return new HashSet<>(organizersIds.stream()
                .map(this::getNGOByIdOrThrowException)
                .toList());
    }

    private void validateNGO(OrganizationNGODto dto) {
        checkIfNGONameAlreadyExists(dto.name());
        checkIfNGOKRSAlreadyExists(dto.KRS());
        checkIfNGONIPAlreadyExists(dto.NIP());
        checkIfNGOREGONAlreadyExists(dto.REGON());
    }

    private void checkIfNGONameAlreadyExists(String name) {
        if (organizationNGORepository.existsByNameIgnoreCase(name)) {
            throw new OrganizationNGOAlreadyExistsException(
                    ErrorMessages.ORGANIZATION_NGO_NAME_ALREADY_EXISTS, name);
        }
    }

    private void checkIfNGOKRSAlreadyExists(String krs) {
        if (krs == null) return;
        if (organizationNGORepository.existsByKRS(krs)) {
            throw new OrganizationNGOAlreadyExistsException(
                    ErrorMessages.ORGANIZATION_NGO_KRS_ALREADY_EXISTS, krs);
        }
    }

    private void checkIfNGONIPAlreadyExists(String nip) {
        if (organizationNGORepository.existsByNIP(nip)) {
            throw new OrganizationNGOAlreadyExistsException(
                    ErrorMessages.ORGANIZATION_NGO_NIP_ALREADY_EXISTS, nip);
        }
    }

    private void checkIfNGOREGONAlreadyExists(String regon) {
        if (organizationNGORepository.existsByREGON(regon)) {
            throw new OrganizationNGOAlreadyExistsException(
                    ErrorMessages.ORGANIZATION_NGO_REGON_ALREADY_EXISTS, regon);
        }
    }

}
