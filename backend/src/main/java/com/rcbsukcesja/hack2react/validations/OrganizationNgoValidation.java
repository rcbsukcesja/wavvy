package com.rcbsukcesja.hack2react.validations;

import com.rcbsukcesja.hack2react.exceptions.alreadyExists.OrganizationNGOAlreadyExistsException;
import com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages;
import com.rcbsukcesja.hack2react.repositories.OrganizationNGORepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OrganizationNgoValidation {
    private final OrganizationNGORepository organizationNGORepository;

    public void checkIfNgoNameAlreadyExists(String name) {
        if (organizationNGORepository.existsByNameIgnoreCase(name)) {
            throw new OrganizationNGOAlreadyExistsException(
                    ErrorMessages.ORGANIZATION_NGO_NAME_ALREADY_EXISTS, name);
        }
    }

    public void checkIfNgoKrsAlreadyExists(String krs) {
        if (krs == null) return;
        if (organizationNGORepository.existsByKrs(krs)) {
            throw new OrganizationNGOAlreadyExistsException(
                    ErrorMessages.ORGANIZATION_NGO_KRS_ALREADY_EXISTS, krs);
        }
    }

    public void checkIfNgoNipAlreadyExists(String nip) {
        if (nip == null) return;
        if (organizationNGORepository.existsByNip(nip)) {
            throw new OrganizationNGOAlreadyExistsException(
                    ErrorMessages.ORGANIZATION_NGO_NIP_ALREADY_EXISTS, nip);
        }
    }

    public void checkIfNgoRegonAlreadyExists(String regon) {
        if (organizationNGORepository.existsByRegon(regon)) {
            throw new OrganizationNGOAlreadyExistsException(
                    ErrorMessages.ORGANIZATION_NGO_REGON_ALREADY_EXISTS, regon);
        }
    }
}
