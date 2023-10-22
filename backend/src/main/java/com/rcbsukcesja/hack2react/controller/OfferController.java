package com.rcbsukcesja.hack2react.controller;

import com.rcbsukcesja.hack2react.model.dto.save.OfferPatchDto;
import com.rcbsukcesja.hack2react.model.dto.save.OfferSaveDto;
import com.rcbsukcesja.hack2react.model.dto.view.OfferView;
import com.rcbsukcesja.hack2react.model.enums.OfferScope;
import com.rcbsukcesja.hack2react.model.enums.OfferStatus;
import com.rcbsukcesja.hack2react.service.OfferService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/offers")
public class OfferController {

    private final OfferService offerService;

    @GetMapping
    public ResponseEntity<Page<OfferView>> getAllOffers(
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate,
            @RequestParam(required = false) List<OfferStatus> offerStatuses,
            @RequestParam(required = false) List<OfferScope> offerScopes,
            @RequestParam(required = false) Boolean closeDeadlineOnly,
            Pageable pageable) {
        return new ResponseEntity<>(offerService.getAllOffers(startDate, endDate, offerStatuses,
                offerScopes, closeDeadlineOnly, pageable), HttpStatus.OK);
    }

    @GetMapping("/{offerId}")
    public ResponseEntity<OfferView> getOfferById(@PathVariable UUID offerId) {
        return new ResponseEntity<>(
                offerService.getOfferById(offerId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<OfferView> createOffer(@RequestBody OfferSaveDto offerSaveDto) {
        return new ResponseEntity<>(offerService.createOffer(offerSaveDto), HttpStatus.CREATED);
    }

    @PutMapping("/{offerId}")
    public ResponseEntity<OfferView> putUpdateOffer(
            @PathVariable UUID offerId,
            @RequestBody @Valid OfferSaveDto offerSaveDto) {
        return new ResponseEntity<>(offerService.putUpdateOffer(offerId, offerSaveDto), HttpStatus.OK);
    }

    @PatchMapping("/{offerId}")
    public ResponseEntity<OfferView> patchUpdateOffer(
            @PathVariable UUID offerId,
            @RequestBody @Valid OfferPatchDto offerPatchDto) {
        return new ResponseEntity<>(offerService.patchUpdateOffer(offerId, offerPatchDto), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOffer(@PathVariable("id") UUID id) {
        offerService.deleteOffer(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
