package com.rcbsukcesja.hack2react.controller;

import com.rcbsukcesja.hack2react.service.OrganizationNGOService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ngo")
public class NGOController {
    private final OrganizationNGOService organizationNGOService;

    @GetMapping
    public ResponseEntity<?> getAllNGO() {
        return new ResponseEntity<>(organizationNGOService.getAllNGO(), HttpStatus.OK);
    }

    @GetMapping("/{ngoId}")
    public ResponseEntity<?> getNGOById(@PathVariable UUID ngoId) {
        return new ResponseEntity<>(organizationNGOService.getNGOById(ngoId), HttpStatus.OK);
    }

}
