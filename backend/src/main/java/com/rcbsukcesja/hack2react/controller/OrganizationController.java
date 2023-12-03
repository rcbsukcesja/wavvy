package com.rcbsukcesja.hack2react.controller;

import com.rcbsukcesja.hack2react.service.OrganizationService;
import com.rcbsukcesja.hack2react.service.StorageService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
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
    private final StorageService storageService;

    private final static String UPLOAD_DIRECTORY = "logo";

    //TODO: tylko właściciel może korzystać z EP
    @PostMapping(value = "/{id}/logo", consumes = "multipart/form-data")
    @PreAuthorize("hasAnyRole('ROLE_NGO','ROLE_COMPANY')")
    public ResponseEntity<?> uploadLogo(
            @PathVariable UUID id,
            @RequestParam("file") MultipartFile file) {
        storageService.store(file, id.toString(), UPLOAD_DIRECTORY);
        String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename());
        organizationService.updateLogoPath(fileExtension, id, UPLOAD_DIRECTORY);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //TODO: tylko właściciel może korzystać z EP
    @DeleteMapping("/{id}/logo")
    @PreAuthorize("hasAnyRole('ROLE_NGO','ROLE_COMPANY')")
    public ResponseEntity<?> removeLogo(
            @PathVariable UUID id) {
        String filePath = organizationService.removeLogoPath(id);
        if (filePath != null) {
            storageService.remove(filePath);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
