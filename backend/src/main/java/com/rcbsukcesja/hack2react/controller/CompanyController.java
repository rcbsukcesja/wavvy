package com.rcbsukcesja.hack2react.controller;

import com.rcbsukcesja.hack2react.model.dto.save.CompanyPatchDto;
import com.rcbsukcesja.hack2react.model.dto.save.CompanySaveDto;
import com.rcbsukcesja.hack2react.model.dto.view.organization.CompanyListView;
import com.rcbsukcesja.hack2react.model.dto.view.organization.CompanyView;
import com.rcbsukcesja.hack2react.service.CompanyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/companies")
public class CompanyController {
    private final CompanyService organizationCompanyService;

    @GetMapping
    public ResponseEntity<Page<CompanyListView>> getAllCompanies(Pageable pageable) {
        return new ResponseEntity<>(organizationCompanyService.getAllCompany(pageable), HttpStatus.OK);
    }

    @GetMapping("/{companyId}")
    public ResponseEntity<?> getCompanyById(@PathVariable UUID companyId) {
        return new ResponseEntity<>(organizationCompanyService.getCompanyById(companyId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CompanyView> createCompany(
            @RequestBody @Valid CompanySaveDto dto) {
        return new ResponseEntity<>(organizationCompanyService.createCompany(dto), HttpStatus.CREATED);
    }

    @PutMapping("/{companyId}")
    public ResponseEntity<CompanyView> putUpdateCompany(
            @PathVariable UUID companyId,
            @RequestBody @Valid CompanySaveDto dto) {
        return new ResponseEntity<>(organizationCompanyService.putUpdateCompany(companyId, dto), HttpStatus.OK);
    }

    @PatchMapping("/{companyId}")
    public ResponseEntity<CompanyView> patchUpdateCompany(
            @PathVariable UUID companyId,
            @RequestBody @Valid CompanyPatchDto dto) {
        return new ResponseEntity<>(organizationCompanyService.patchUpdateCompany(companyId, dto), HttpStatus.OK);
    }

    @DeleteMapping("/{companyId}")
    public ResponseEntity<?> deleteCompany(@PathVariable UUID companyId) {
        organizationCompanyService.deleteCompany(companyId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
