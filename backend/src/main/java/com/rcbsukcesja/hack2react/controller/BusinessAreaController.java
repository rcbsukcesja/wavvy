package com.rcbsukcesja.hack2react.controller;

import com.rcbsukcesja.hack2react.model.dto.save.BusinessAreaDto;
import com.rcbsukcesja.hack2react.model.dto.view.BusinessAreaView;
import com.rcbsukcesja.hack2react.service.BusinessAreaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/business-areas")
public class BusinessAreaController {
    private final BusinessAreaService businessAreaService;

    @GetMapping
    public ResponseEntity<List<BusinessAreaView>> getAllBusinessAreas() {
        return new ResponseEntity<>(businessAreaService
                .getAllBusinessAreas(), HttpStatus.OK);
    }

    @GetMapping("/{businessAreaId}")
    public ResponseEntity<BusinessAreaView> getBusinessAreaById(@PathVariable UUID businessAreaId) {
        return new ResponseEntity<>(businessAreaService
                .getBusinessAreaById(businessAreaId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<BusinessAreaView> createBusinessArea(
            @RequestBody BusinessAreaDto businessAreaDto) {
        return new ResponseEntity<>(businessAreaService
                .saveBusinessArea(null, businessAreaDto), HttpStatus.CREATED);
    }

    @PutMapping("/{businessAreaId}")
    public ResponseEntity<BusinessAreaView> updateBusinessArea(
            @PathVariable UUID businessAreaId,
            @RequestBody BusinessAreaDto businessAreaDto) {
        return new ResponseEntity<>(businessAreaService
                .saveBusinessArea(businessAreaId, businessAreaDto), HttpStatus.OK);
    }

    @DeleteMapping("/{businessAreaId}")
    public ResponseEntity<?> deleteBusinessArea(@PathVariable UUID businessAreaId) {
        businessAreaService.deleteBusinessArea(businessAreaId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
