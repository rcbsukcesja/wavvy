package com.rcbsukcesja.hack2react.controller;

import com.rcbsukcesja.hack2react.model.dto.save.OrganizationNGOPatchDto;
import com.rcbsukcesja.hack2react.model.dto.save.OrganizationNGOSaveDto;
import com.rcbsukcesja.hack2react.model.dto.view.organization.OrganizationNGOListView;
import com.rcbsukcesja.hack2react.model.dto.view.organization.OrganizationNGOView;
import com.rcbsukcesja.hack2react.service.OrganizationNGOService;
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
@RequestMapping("/ngos")
public class NGOController {
    private final OrganizationNGOService organizationNGOService;

    @GetMapping
    public ResponseEntity<Page<OrganizationNGOListView>> getAllNGO(@RequestParam(required = false) String search,
                                                                   @ParameterObject Pageable pageable,
                                                                   Authentication authentication) {
        return new ResponseEntity<>(organizationNGOService.getAllNGO(search, pageable, authentication), HttpStatus.OK);
    }

    @GetMapping("/{ngoId}")
    public ResponseEntity<?> getNGOById(@PathVariable UUID ngoId) {
        return new ResponseEntity<>(organizationNGOService.getNGOById(ngoId), HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<OrganizationNGOView> createNGO(
            @RequestBody @Valid OrganizationNGOSaveDto dto) {
        return new ResponseEntity<>(organizationNGOService.createNGO(dto), HttpStatus.CREATED);
    }

    @PutMapping("/{ngoId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<OrganizationNGOView> putUpdateNGO(
            @PathVariable UUID ngoId,
            @RequestBody @Valid OrganizationNGOSaveDto dto) {
        return new ResponseEntity<>(organizationNGOService.putUpdateNGO(ngoId, dto), HttpStatus.OK);
    }

    @PatchMapping("/{ngoId}")
    @PreAuthorize("hasAnyRole('ROLE_CITY_HALL', 'ROLE_NGO')")
    public ResponseEntity<OrganizationNGOView> patchUpdateNGO(
            @PathVariable UUID ngoId,
            @RequestBody @Valid OrganizationNGOPatchDto dto) {
        return new ResponseEntity<>(organizationNGOService.patchUpdateNGO(ngoId, dto), HttpStatus.OK);
    }


    @DeleteMapping("/{ngoId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteNGO(@PathVariable UUID ngoId) {
        organizationNGOService.deleteNGO(ngoId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('ROLE_NGO')")
    public ResponseEntity<OrganizationNGOView> getMyNGO() {
        return new ResponseEntity<>(organizationNGOService.getMyNGO(), HttpStatus.OK);
    }
}
