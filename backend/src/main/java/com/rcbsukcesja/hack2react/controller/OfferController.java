package com.rcbsukcesja.hack2react.controller;

import com.rcbsukcesja.hack2react.model.dto.OfferDto;
import com.rcbsukcesja.hack2react.service.OfferService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/offers")
public class OfferController {

    private final OfferService offerService;


    @GetMapping
    public ResponseEntity<?> getAllOffers() {
        return new ResponseEntity<>(
                offerService.getAllOffers(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOfferById(@PathVariable("id") UUID id) {
        return new ResponseEntity<>(
                offerService.getOfferById(id), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<?> createOffer(@RequestBody OfferDto offerDto) {
        return new ResponseEntity<>(offerService.createOffer(offerDto)
                , HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOffer(@PathVariable("id") UUID id) {
        offerService.deleteOffer(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
