package com.rcbsukcesja.hack2react.service;

import com.rcbsukcesja.hack2react.exceptions.alreadyExists.OrganizationNGOAlreadyExistsException;
import com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages;
import com.rcbsukcesja.hack2react.exceptions.notFound.OrganizationNGONotFoundException;
import com.rcbsukcesja.hack2react.model.dto.save.OrganizationNGODto;
import com.rcbsukcesja.hack2react.model.dto.view.organization.OrganizationNGOView;
import com.rcbsukcesja.hack2react.model.entity.OrganizationNGO;
import com.rcbsukcesja.hack2react.model.mappers.OrganizationNGOMapper;
import com.rcbsukcesja.hack2react.repositories.OrganizationNGORepository;
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
        // TODO: change the way of obtaining OrganizationNGO object - change id into objects
        OrganizationNGO ngo = organizationNGOMapper.organizationNGODtoToOrganizationNGO(dto);
        OrganizationNGO saved = organizationNGORepository.save(ngo);
        return organizationNGOMapper.organizationNGOToOrganizationNGOView(saved);
    }

    @Transactional
    public OrganizationNGOView updateNGO(UUID ngoId, OrganizationNGODto dto) {
        OrganizationNGO actual = getNGOByIdOrThrowException(ngoId);
        if (!actual.getName().equalsIgnoreCase(dto.name())) {
            checkIfNGONameAlreadyExists(dto.name());
        }
        if (!actual.getKRS().equals(dto.KRS())) {
            checkIfNGOKRSAlreadyExists(dto.KRS());
        }
        if(!actual.getNIP().equals(dto.NIP())) {
            checkIfNGONIPAlreadyExists(dto.NIP());
        }
        if(!actual.getREGON().equals(dto.REGON())) {
            checkIfNGOREGONAlreadyExists(dto.REGON());
        }
        // TODO: update fields and return view
        return null;

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
