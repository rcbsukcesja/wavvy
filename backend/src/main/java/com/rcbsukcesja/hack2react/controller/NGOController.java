package com.rcbsukcesja.hack2react.controller;

import com.rcbsukcesja.hack2react.model.dto.save.OrganizationNGODto;
import com.rcbsukcesja.hack2react.model.dto.view.organization.OrganizationNGOView;
import com.rcbsukcesja.hack2react.service.OrganizationNGOService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ngos")
public class NGOController {
    private final OrganizationNGOService organizationNGOService;

    @GetMapping
    public ResponseEntity<List<OrganizationNGOView>> getAllNGO() {
        return new ResponseEntity<>(organizationNGOService.getAllNGO(), HttpStatus.OK);
    }

    @GetMapping("/{ngoId}")
    public ResponseEntity<?> getNGOById(@PathVariable UUID ngoId) {
        return new ResponseEntity<>(organizationNGOService.getNGOById(ngoId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<OrganizationNGOView> createNGO(
            @RequestBody @Validated(OrganizationNGODto.CreateNGO.class) OrganizationNGODto dto) {
        return new ResponseEntity<>(organizationNGOService.createNGO(dto), HttpStatus.CREATED);
    }

    @PatchMapping("/{ngoId}")
    public ResponseEntity<OrganizationNGOView> updateNGO(
            @PathVariable UUID ngoId,
            @RequestBody @Validated(OrganizationNGODto.UpdateNGO.class) OrganizationNGODto dto) {
        return new ResponseEntity<>(organizationNGOService.updateNGO(ngoId, dto), HttpStatus.OK);
    }

    @DeleteMapping("/{ngoId}")
    public ResponseEntity<?> deleteOffer(@PathVariable UUID ngoId) {
        organizationNGOService.deleteNGO(ngoId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
