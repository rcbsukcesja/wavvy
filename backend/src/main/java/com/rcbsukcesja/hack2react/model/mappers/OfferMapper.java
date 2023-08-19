package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.save.OfferDto;
import com.rcbsukcesja.hack2react.model.dto.view.OfferView;
import com.rcbsukcesja.hack2react.model.entity.Offer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OfferMapper {

    Offer offerViewToOffer(OfferView offerView);

    OfferView offerToOfferView(Offer offer);

    List<Offer> offerViewListToOfferList(List<OfferView> offerViews);

    List<OfferView> offerListToOfferViewList(List<Offer> offers);

    @Mapping(target = "id", ignore = true)
    Offer offerDtoToOffer(OfferDto offerDto);
}
