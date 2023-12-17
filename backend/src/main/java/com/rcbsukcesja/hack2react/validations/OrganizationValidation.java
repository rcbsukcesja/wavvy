package com.rcbsukcesja.hack2react.validations;

import com.rcbsukcesja.hack2react.exceptions.alreadyExists.OrganizationAlreadyExistsException;
import com.rcbsukcesja.hack2react.exceptions.badrequest.InvalidKrsException;
import com.rcbsukcesja.hack2react.exceptions.badrequest.InvalidNipException;
import com.rcbsukcesja.hack2react.exceptions.badrequest.InvalidRegonException;
import com.rcbsukcesja.hack2react.exceptions.forbidden.ForbiddenAccessDeniedException;
import com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages;
import com.rcbsukcesja.hack2react.model.entity.Organization;
import com.rcbsukcesja.hack2react.repositories.OrganizationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OrganizationValidation {
    private final OrganizationRepository organizationRepository;

    public void checkIfOrganizationNameAlreadyExists(String name) {
        if (organizationRepository.existsByNameIgnoreCase(name)) {
            throw new OrganizationAlreadyExistsException(
                    ErrorMessages.ORGANIZATION_NAME_ALREADY_EXISTS, name);
        }
    }

    public void checkIfOrganizationKrsAlreadyExists(String krs) {
        if (krs == null || krs.isBlank()) return;
        if (organizationRepository.existsByKrs(krs)) {
            throw new OrganizationAlreadyExistsException(
                    ErrorMessages.ORGANIZATION_KRS_ALREADY_EXISTS, krs);
        }
    }

    public void checkIfOrganizationNipAlreadyExists(String nip) {
        if (nip == null || nip.isBlank()) return;
        if (organizationRepository.existsByNip(nip)) {
            throw new OrganizationAlreadyExistsException(
                    ErrorMessages.ORGANIZATION_NIP_ALREADY_EXISTS, nip);
        }
    }

    public void checkIfOrganizationRegonAlreadyExists(String regon) {
        if (regon == null || regon.isBlank()) return;
        if (organizationRepository.existsByRegon(regon)) {
            throw new OrganizationAlreadyExistsException(
                    ErrorMessages.ORGANIZATION_REGON_ALREADY_EXISTS, regon);
        }
    }

    public void checkIfNotDisabledOrUnconfirmed(Organization organization) {
        if (organization.isDisabled() || !organization.isConfirmed()) {
            throw new ForbiddenAccessDeniedException(ErrorMessages.ACCESS_DENIED_MESSAGE);
        }
    }

    public void checkIfOrganizationNameAlreadyExistsWhileConfirming(String name) {
        if (organizationRepository.findAllByNameIgnoreCase(name).size() > 1) {
            throw new OrganizationAlreadyExistsException(
                    ErrorMessages.ORGANIZATION_NAME_ALREADY_EXISTS, name);
        }
    }

    public void checkIfOrganizationKrsAlreadyExistsWhileConfirming(String krs) {
        if (krs == null || krs.isBlank()) return;
        if (!ValidationConstants.patternNip.matcher(krs).matches()) {
            throw new InvalidKrsException(ErrorMessages.KRS_VALIDATION_ERROR);
        }
        if (organizationRepository.findAllByKrs(krs).size() > 1) {
            throw new OrganizationAlreadyExistsException(
                    ErrorMessages.ORGANIZATION_KRS_ALREADY_EXISTS, krs);
        }
    }

    public void checkIfOrganizationNipAlreadyExistsWhileConfirming(String nip) {
        if (nip == null || nip.isBlank()) return;
        if (!ValidationConstants.patternNip.matcher(nip).matches()) {
            throw new InvalidNipException(ErrorMessages.NIP_VALIDATION_ERROR);
        }
        if (organizationRepository.findAllByNip(nip).size() > 1) {
            throw new OrganizationAlreadyExistsException(
                    ErrorMessages.ORGANIZATION_NIP_ALREADY_EXISTS, nip);
        }
    }

    public void checkIfOrganizationRegonAlreadyExistsWhileConfirming(String regon) {
        if (regon == null || regon.isBlank()) return;
        if (!ValidationConstants.patternRegon.matcher(regon).matches()) {
            throw new InvalidRegonException(ErrorMessages.REGON_VALIDATION_ERROR);
        }
        if (organizationRepository.findAllByRegon(regon).size() > 1) {
            throw new OrganizationAlreadyExistsException(
                    ErrorMessages.ORGANIZATION_REGON_ALREADY_EXISTS, regon);
        }
    }

    public void validateOfficialOrganizationFieldsDuringConfirmation(Organization organization) {
        checkIfOrganizationNameAlreadyExistsWhileConfirming(organization.getName());
        checkIfOrganizationNipAlreadyExistsWhileConfirming(organization.getNip());
        checkIfOrganizationKrsAlreadyExistsWhileConfirming(organization.getKrs());
        checkIfOrganizationRegonAlreadyExistsWhileConfirming(organization.getRegon());
    }
}
