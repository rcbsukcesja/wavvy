package com.rcbsukcesja.hack2react.service;

import com.rcbsukcesja.hack2react.model.dto.OfferDto;
import com.rcbsukcesja.hack2react.model.dto.UserDto;
import com.rcbsukcesja.hack2react.model.entity.Offer;
import com.rcbsukcesja.hack2react.model.entity.User;
import com.rcbsukcesja.hack2react.model.mappers.OfferMapper;
import com.rcbsukcesja.hack2react.model.mappers.UserMapper;
import com.rcbsukcesja.hack2react.repositories.OfferRepository;
import com.rcbsukcesja.hack2react.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OfferService {

    private final OfferRepository offerRepository;
    private final OfferMapper offerMapper;

    public List<OfferDto> getAllOffers() {
        return offerMapper.offerListToOfferDtoList(offerRepository.findAll());
    }

    public OfferDto getOfferById(UUID id) {
        return offerMapper.offerToOfferDto(offerRepository.getOfferById(id));
    }

    @Transactional
    public UUID createOffer(OfferDto offerDto) {
        Offer offer = offerMapper.offerDtoToOffer(offerDto);
        Offer saved = offerRepository.save(offer);
        return saved.getId();
    }

    @Transactional
    public void deleteOffer(UUID id){
        Offer offer = offerRepository.getOfferById(id);
        offerRepository.delete(offer);
    }
}
