package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.view.OfferView;
import com.rcbsukcesja.hack2react.model.entity.Offer;
import com.rcbsukcesja.hack2react.utils.TimeUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.time.LocalDate;
import java.util.List;

@Mapper(componentModel = "spring")
public interface OfferMapper {

    @Mapping(source = "endDate", target = "closeDeadline", qualifiedByName = "endDateToCloseDeadline")
    OfferView offerToOfferView(Offer offer);

    List<OfferView> offerListToOfferViewList(List<Offer> offers);

    @Named("endDateToCloseDeadline")
    default boolean endDateToCloseDeadline(LocalDate endDate) {
        return TimeUtils.isCloseDeadline(endDate);
    }
}
