package com.rcbsukcesja.hack2react.service;

import com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages;
import com.rcbsukcesja.hack2react.exceptions.notFound.OfferNotFoundException;
import com.rcbsukcesja.hack2react.model.dto.save.OfferDto;
import com.rcbsukcesja.hack2react.model.dto.view.OfferView;
import com.rcbsukcesja.hack2react.model.entity.Offer;
import com.rcbsukcesja.hack2react.model.mappers.OfferMapper;
import com.rcbsukcesja.hack2react.repositories.OfferRepository;
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

    public List<OfferView> getAllOffers() {
        return offerMapper.offerListToOfferViewList(offerRepository.findAll());
    }

    public OfferView getOfferById(UUID id) {
        return offerMapper.offerToOfferView(getOfferByIdOrThrowException(id));
    }

    @Transactional
    public OfferView updateOffer(UUID offerId, OfferDto offerDto) {
        Offer actual = getOfferByIdOrThrowException(offerId);
        Offer updated = offerMapper.offerDtoToOffer(offerDto);
        updated.setId(actual.getId());

        Offer saved = offerRepository.save(updated);
        return offerMapper.offerToOfferView(saved);
    }

    @Transactional
    public OfferView createOffer(OfferView offerView) {
        Offer offer = offerMapper.offerViewToOffer(offerView);
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
