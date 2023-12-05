package com.rcbsukcesja.hack2react.controller;

import com.rcbsukcesja.hack2react.service.OrganizationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/organizations")
public class OrganizationController {
    private final OrganizationService organizationService;

    private final static String UPLOAD_DIRECTORY = "logo";

    @PostMapping(value = "/{organizationId}/logo", consumes = "multipart/form-data")
    @PreAuthorize("hasAnyRole('ROLE_NGO','ROLE_COMPANY')")
    public ResponseEntity<?> uploadLogo(
            @PathVariable UUID organizationId,
            @RequestParam("file") MultipartFile file) {
        organizationService.updateLogo(file, organizationId, UPLOAD_DIRECTORY);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{organizationId}/logo")
    @PreAuthorize("hasAnyRole('ROLE_NGO','ROLE_COMPANY')")
    public ResponseEntity<?> removeLogo(
            @PathVariable UUID organizationId) {
        organizationService.removeLogo(organizationId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
