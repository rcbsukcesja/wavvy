package com.rcbsukcesja.hack2react.controller;

import com.rcbsukcesja.hack2react.model.dto.save.OrganizationNGOPatchDto;
import com.rcbsukcesja.hack2react.model.dto.save.OrganizationNGOSaveDto;
import com.rcbsukcesja.hack2react.model.dto.view.organization.OrganizationNGOListView;
import com.rcbsukcesja.hack2react.model.dto.view.organization.OrganizationNGOView;
import com.rcbsukcesja.hack2react.service.OrganizationNGOService;
import com.rcbsukcesja.hack2react.service.StorageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ngos")
public class NGOController {
    private final OrganizationNGOService organizationNGOService;
    private final StorageService storageService;

    @GetMapping
    public ResponseEntity<List<OrganizationNGOListView>> getAllNGO() {
        return new ResponseEntity<>(organizationNGOService.getAllNGO(), HttpStatus.OK);
    }

    @GetMapping("/{ngoId}")
    public ResponseEntity<?> getNGOById(@PathVariable UUID ngoId) {
        return new ResponseEntity<>(organizationNGOService.getNGOById(ngoId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<OrganizationNGOView> createNGO(
            @RequestBody @Valid OrganizationNGOSaveDto dto) {
        return new ResponseEntity<>(organizationNGOService.saveNGO(null, dto), HttpStatus.CREATED);
    }

    @PutMapping("/{ngoId}")
    public ResponseEntity<OrganizationNGOView> putUpdateNGO(
            @PathVariable UUID ngoId,
            @RequestBody @Valid OrganizationNGOSaveDto dto) {
        return new ResponseEntity<>(organizationNGOService.saveNGO(ngoId, dto), HttpStatus.OK);
    }

    @PatchMapping("/{ngoId}")
    public ResponseEntity<OrganizationNGOView> patchUpdateNGO(
            @PathVariable UUID ngoId,
            @RequestBody @Valid OrganizationNGOPatchDto dto) {
        return new ResponseEntity<>(organizationNGOService.updateNGO(ngoId, dto), HttpStatus.OK);
    }

    @DeleteMapping("/{ngoId}")
    public ResponseEntity<?> deleteNGO(@PathVariable UUID ngoId) {
        organizationNGOService.deleteNGO(ngoId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{ngoId}/logo")
    public ResponseEntity<?> uploadLogo(
            @PathVariable UUID ngoId,
            @RequestParam("file") MultipartFile file) {
        storageService.store(file, ngoId.toString(), "logo");
        String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename());
        organizationNGOService.updateLogoPath(fileExtension, ngoId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{ngoId}/logo")
    public ResponseEntity<?> removeLogo(
            @PathVariable UUID ngoId) {
        String filePath = organizationNGOService.removeLogoPath(ngoId);
        if (filePath != null) {
            storageService.remove(filePath);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
