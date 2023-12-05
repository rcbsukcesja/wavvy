package com.rcbsukcesja.hack2react.controller;

import com.rcbsukcesja.hack2react.model.dto.save.CompanyPatchDto;
import com.rcbsukcesja.hack2react.model.dto.save.CompanySaveDto;
import com.rcbsukcesja.hack2react.model.dto.view.organization.CompanyListView;
import com.rcbsukcesja.hack2react.model.dto.view.organization.CompanyView;
import com.rcbsukcesja.hack2react.service.CompanyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/companies")
public class CompanyController {
    private final CompanyService organizationCompanyService;

    @GetMapping
    public ResponseEntity<Page<CompanyListView>> getAllCompanies(@RequestParam(required = false) String search,
                                                                 @ParameterObject Pageable pageable,
                                                                 Authentication authentication) {
        return new ResponseEntity<>(organizationCompanyService.getAllCompanies(search, pageable, authentication), HttpStatus.OK);
    }

    @GetMapping("/{companyId}")
    public ResponseEntity<?> getCompanyById(@PathVariable UUID companyId) {
        return new ResponseEntity<>(organizationCompanyService.getCompanyById(companyId), HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<CompanyView> createCompany(
            @RequestBody @Valid CompanySaveDto dto) {
        return new ResponseEntity<>(organizationCompanyService.createCompany(dto), HttpStatus.CREATED);
    }

    @PutMapping("/{companyId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<CompanyView> putUpdateCompany(
            @PathVariable UUID companyId,
            @RequestBody @Valid CompanySaveDto dto) {
        return new ResponseEntity<>(organizationCompanyService.putUpdateCompany(companyId, dto), HttpStatus.OK);
    }

    @PatchMapping("/{companyId}")
    @PreAuthorize("hasAnyRole('ROLE_CITY_HALL', 'ROLE_COMPANY')")
    public ResponseEntity<CompanyView> patchUpdateCompany(
            @PathVariable UUID companyId,
            @RequestBody @Valid CompanyPatchDto dto) {
        return new ResponseEntity<>(organizationCompanyService.patchUpdateCompany(companyId, dto), HttpStatus.OK);
    }

    @DeleteMapping("/{companyId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteCompany(@PathVariable UUID companyId) {
        organizationCompanyService.deleteCompany(companyId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('ROLE_COMPANY')")
    public ResponseEntity<CompanyView> getMyCompany() {
        return new ResponseEntity<>(organizationCompanyService.getMyCompany(), HttpStatus.OK);
    }

}
