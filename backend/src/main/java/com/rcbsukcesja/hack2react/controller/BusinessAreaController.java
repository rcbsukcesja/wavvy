package com.rcbsukcesja.hack2react.controller;

import com.rcbsukcesja.hack2react.model.mappers.BusinessAreaMapper;
import com.rcbsukcesja.hack2react.service.BusinessAreaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/business-areas")
public class BusinessAreaController {
    private final BusinessAreaService businessAreaService;
    private final BusinessAreaMapper businessAreaMapper;

    @GetMapping
    public ResponseEntity<?> getAllBusinessAreas() {
        return new ResponseEntity<>(businessAreaMapper
                .businessAreaListToBusinessAreaDtoList(businessAreaService
                        .getAllBusinessAreas()), HttpStatus.OK);
    }
}
