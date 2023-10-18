package com.rcbsukcesja.hack2react.service;

import com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages;
import com.rcbsukcesja.hack2react.exceptions.notFound.OfferNotFoundException;
import com.rcbsukcesja.hack2react.model.dto.save.OfferPatchDto;
import com.rcbsukcesja.hack2react.model.dto.save.OfferSaveDto;
import com.rcbsukcesja.hack2react.model.dto.view.OfferView;
import com.rcbsukcesja.hack2react.model.entity.Offer;
import com.rcbsukcesja.hack2react.model.mappers.OfferMapper;
import com.rcbsukcesja.hack2react.repositories.OfferRepository;
import com.rcbsukcesja.hack2react.validations.OfferValidation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OfferService {

    private final OfferMapper offerMapper;
    private final OfferRepository offerRepository;
    private final OfferValidation offerValidation;

    public List<OfferView> getAllOffers() {
        return offerMapper.offerListToOfferViewList(offerRepository.findAll());
    }

    public OfferView getOfferById(UUID id) {
        return offerMapper.offerToOfferView(getOfferByIdOrThrowException(id));
    }

    @Transactional
    public OfferView saveOffer(UUID offerId, OfferSaveDto offerSaveDto) {
        Offer offer;
        if (offerId != null) {
            offer = getOfferByIdOrThrowException(offerId);
        } else {
            offer = new Offer();
        }
        offer.setName(offerSaveDto.name());
        offer.setDescription(offerSaveDto.description());
        offer.setBudget(offerSaveDto.budget());
        offer.setFundingLevel(offerSaveDto.fundingLevel());
        offer.setTargetAudience(offerSaveDto.targetAudience());
        offer.setLink(offerSaveDto.link());
        offer.setStartDate(offerSaveDto.startDate());
        offer.setEndDate(offerSaveDto.endDate());
        offer.setScope(offerSaveDto.scope());
        offerValidation.validateDates(offer);
        Offer saved = offerRepository.save(offer);
        return offerMapper.offerToOfferView(saved);
    }

    @Transactional
    public OfferView updateOffer(UUID offerId, OfferPatchDto offerPatchDto) {
        Offer offer = getOfferByIdOrThrowException(offerId);
        boolean dateChanged = false;

        if (offerPatchDto.name() != null && !offerPatchDto.name().equals(offer.getName())) {
            offer.setName(offerPatchDto.name());
        }
        if (offerPatchDto.description() != null && !offerPatchDto.description().equals(offer.getDescription())) {
            offer.setDescription(offerPatchDto.description());
        }
        if (offerPatchDto.budget() != null && !offerPatchDto.budget().equals(offer.getBudget())) {
            offer.setBudget(offerPatchDto.budget());
        }
        if (offerPatchDto.fundingLevel() != null && !offerPatchDto.fundingLevel().equals(offer.getFundingLevel())) {
            offer.setFundingLevel(offerPatchDto.fundingLevel());
        }
        if (offerPatchDto.targetAudience() != null && !offerPatchDto.targetAudience().equals(offer.getTargetAudience())) {
            offer.setTargetAudience(offerPatchDto.targetAudience());
        }
        if (offerPatchDto.link() != null && !offerPatchDto.link().equals(offer.getLink())) {
            offer.setLink(offerPatchDto.link());
        }
        if (offerPatchDto.startDate() != null && !offerPatchDto.startDate().equals(offer.getStartDate())) {
            offer.setStartDate(offerPatchDto.startDate());
            dateChanged = true;
        }
        if (offerPatchDto.endDate() != null && !offerPatchDto.endDate().equals(offer.getEndDate())) {
            offer.setEndDate(offerPatchDto.endDate());
            dateChanged = true;
        }
        if (offerPatchDto.scope() != null && !offerPatchDto.scope().equals(offer.getScope())) {
            offer.setScope(offerPatchDto.scope());
        }

        if (dateChanged) {
            offerValidation.validateDates(offer);
        }

        Offer saved = offerRepository.save(offer);
        return offerMapper.offerToOfferView(saved);
    }

    @Transactional
    public void deleteOffer(UUID id) {
        Offer offer = getOfferByIdOrThrowException(id);
        offerRepository.delete(offer);
    }

    public Offer getOfferByIdOrThrowException(UUID id) {
        return offerRepository.getOfferById(id)
                .orElseThrow(() -> new OfferNotFoundException(
                        ErrorMessages.OFFER_NOT_FOUND, id));
    }

}
