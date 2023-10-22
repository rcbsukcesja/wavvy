package com.rcbsukcesja.hack2react.controller;

import com.rcbsukcesja.hack2react.service.OrganizationService;
import com.rcbsukcesja.hack2react.service.StorageService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/{id}/logo")
    public ResponseEntity<?> uploadLogo(
            @PathVariable UUID id,
            @RequestParam("file") MultipartFile file) {
        storageService.store(file, id.toString(), "logo");
        String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename());
        organizationService.updateLogoPath(fileExtension, id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}/logo")
    public ResponseEntity<?> removeLogo(
            @PathVariable UUID id) {
        String filePath = organizationService.removeLogoPath(id);
        if (filePath != null) {
            storageService.remove(filePath);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
