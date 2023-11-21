package com.rcbsukcesja.hack2react.controller;

import com.rcbsukcesja.hack2react.exceptions.badrequest.InvalidOfferScopeException;
import com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages;
import com.rcbsukcesja.hack2react.model.dto.save.OfferPatchDto;
import com.rcbsukcesja.hack2react.model.dto.save.OfferSaveDto;
import com.rcbsukcesja.hack2react.model.dto.view.OfferView;
import com.rcbsukcesja.hack2react.model.enums.OfferScope;
import com.rcbsukcesja.hack2react.model.enums.OfferStatus;
import com.rcbsukcesja.hack2react.service.OfferService;
import com.rcbsukcesja.hack2react.utils.AuthenticationUtils;
import com.rcbsukcesja.hack2react.utils.TokenUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
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
import java.util.Arrays;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/offers")
public class OfferController {

    private final OfferService offerService;

    @GetMapping
    public ResponseEntity<Page<OfferView>> getAllOffers(
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate,
            @RequestParam(required = false) Set<OfferStatus> offerStatuses,
            @RequestParam(required = false) Set<OfferScope> offerScopes,
            @RequestParam(required = false) Boolean closeDeadlineOnly,
            @RequestParam(required = false) Boolean followedByUser,
            @ParameterObject Pageable pageable,
            Authentication authentication) {
        UUID userId = TokenUtils.getUserId(authentication);

        offerScopes = setOfferScopes(offerScopes, authentication);
        checkOfferScopes(offerScopes, authentication);
        return ResponseEntity.ok(offerService.getAllOffers(startDate, endDate, offerStatuses,
                offerScopes, closeDeadlineOnly, followedByUser, userId, pageable));
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

    @PatchMapping("/{id}/follow")
    @PreAuthorize("hasAnyRole('ROLE_NGO','ROLE_COMPANY')")
    public ResponseEntity<?> followOffer(@PathVariable("id") UUID id, Authentication authentication) {
        UUID userId = TokenUtils.getUserId(authentication);
        offerService.followOffer(id, userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    private static Set<OfferScope> setOfferScopes(Set<OfferScope> offerScopes, Authentication authentication) {
        if (offerScopes == null || offerScopes.isEmpty()) {
            if (authentication == null) {
                offerScopes = OfferScope.getAllowedOfferScopes(OfferScope.offerScopesNotPublic());
            } else if (AuthenticationUtils.hasRole(authentication, "ROLE_NGO")) {
                offerScopes = OfferScope.getAllowedOfferScopes(OfferScope.offerScopesNotForNgo());
            } else if (AuthenticationUtils.hasRole(authentication, "ROLE_COMPANY")) {
                offerScopes = OfferScope.getAllowedOfferScopes(OfferScope.offerScopesNotForCompany());
            } else if (AuthenticationUtils.hasRole(authentication, "ROLE_CITY_HALL")) {
                offerScopes = Arrays.stream(OfferScope.values()).collect(Collectors.toSet());
            }
        }
        return offerScopes;
    }

    private static void checkOfferScopes(Set<OfferScope> offerScopes, Authentication authentication) {
        if (authentication == null) {
            if (OfferScope.isOfferScopeNotAllowed(offerScopes, OfferScope.offerScopesNotPublic())) {
                throw new InvalidOfferScopeException(ErrorMessages.INVALID_OFFER_SCOPE);
            } else {
                return;
            }
        }

        if (AuthenticationUtils.hasRole(authentication, "ROLE_NGO")
                && OfferScope.isOfferScopeNotAllowed(offerScopes, OfferScope.offerScopesNotForNgo())
                || AuthenticationUtils.hasRole(authentication, "ROLE_COMPANY")
                && OfferScope.isOfferScopeNotAllowed(offerScopes, OfferScope.offerScopesNotForCompany())
                || AuthenticationUtils.hasRole(authentication, "ROLE_CITY_HALL")
        ) {
            throw new InvalidOfferScopeException(ErrorMessages.INVALID_OFFER_SCOPE);
        }
    }

}
