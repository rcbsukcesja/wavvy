package com.rcbsukcesja.hack2react.validations;

import com.rcbsukcesja.hack2react.exceptions.alreadyExists.OrganizationAlreadyExistsException;
import com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages;
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
        if (krs == null) return;
        if (organizationRepository.existsByKrs(krs)) {
            throw new OrganizationAlreadyExistsException(
                    ErrorMessages.ORGANIZATION_KRS_ALREADY_EXISTS, krs);
        }
    }

    public void checkIfOrganizationNipAlreadyExists(String nip) {
        if (nip == null) return;
        if (organizationRepository.existsByNip(nip)) {
            throw new OrganizationAlreadyExistsException(
                    ErrorMessages.ORGANIZATION_NIP_ALREADY_EXISTS, nip);
        }
    }

    public void checkIfOrganizationRegonAlreadyExists(String regon) {
        if (regon == null) return;
        if (organizationRepository.existsByRegon(regon)) {
            throw new OrganizationAlreadyExistsException(
                    ErrorMessages.ORGANIZATION_REGON_ALREADY_EXISTS, regon);
        }
    }
}
