package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.OfferDto;
import com.rcbsukcesja.hack2react.model.entity.Offer;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OfferMapper {

    Offer offerDtoToOffer(OfferDto offerDto);

    OfferDto offerToOfferDto(Offer offer);

    List<Offer> offerDtoListToOfferList(List<OfferDto> offerDtos);

    List<OfferDto> offerListToOfferDtoList(List<Offer> offers);
}
