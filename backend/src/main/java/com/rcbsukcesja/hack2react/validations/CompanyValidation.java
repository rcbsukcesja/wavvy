package com.rcbsukcesja.hack2react.validations;

import com.rcbsukcesja.hack2react.exceptions.alreadyExists.CompanyAlreadyExistsException;
import com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages;
import com.rcbsukcesja.hack2react.repositories.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CompanyValidation {
    private final CompanyRepository companyRepository;

    public void checkIfCompanyNameAlreadyExists(String name) {
        if (companyRepository.existsByNameIgnoreCase(name)) {
            throw new CompanyAlreadyExistsException(
                    ErrorMessages.COMPANY_NAME_ALREADY_EXISTS, name);
        }
    }

    public void checkIfCompanyKrsAlreadyExists(String krs) {
        if (krs == null) return;
        if (companyRepository.existsByKrs(krs)) {
            throw new CompanyAlreadyExistsException(
                    ErrorMessages.COMPANY_KRS_ALREADY_EXISTS, krs);
        }
    }

    public void checkIfCompanyNipAlreadyExists(String nip) {
        if (nip == null) return;
        if (companyRepository.existsByNip(nip)) {
            throw new CompanyAlreadyExistsException(
                    ErrorMessages.COMPANY_NIP_ALREADY_EXISTS, nip);
        }
    }

    public void checkIfCompanyRegonAlreadyExists(String regon) {
        if (companyRepository.existsByRegon(regon)) {
            throw new CompanyAlreadyExistsException(
                    ErrorMessages.COMPANY_REGON_ALREADY_EXISTS, regon);
        }
    }
}
