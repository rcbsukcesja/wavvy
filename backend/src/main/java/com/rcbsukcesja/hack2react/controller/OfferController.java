package com.rcbsukcesja.hack2react.controller;

import com.rcbsukcesja.hack2react.model.dto.save.OfferDto;
import com.rcbsukcesja.hack2react.model.dto.view.OfferView;
import com.rcbsukcesja.hack2react.service.OfferService;
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
@RequestMapping("/offers")
public class OfferController {

    private final OfferService offerService;


    @GetMapping
    public ResponseEntity<List<OfferView>> getAllOffers() {
        return new ResponseEntity<>(
                offerService.getAllOffers(), HttpStatus.OK);
    }

    @GetMapping("/{offerId}")
    public ResponseEntity<OfferView> getOfferById(@PathVariable UUID offerId) {
        return new ResponseEntity<>(
                offerService.getOfferById(offerId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<OfferView> createOffer(@RequestBody OfferView offerView) {
        return new ResponseEntity<>(
                offerService.createOffer(offerView), HttpStatus.CREATED);
    }

    @PutMapping("/{offerId}")
    public ResponseEntity<OfferView> updateOffer(
            @PathVariable UUID offerId,
            @RequestBody OfferDto offerDto) {
        OfferView result = offerService.updateOffer(offerId, offerDto);
        return new ResponseEntity<>(
                result, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOffer(@PathVariable("id") UUID id) {
        offerService.deleteOffer(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
