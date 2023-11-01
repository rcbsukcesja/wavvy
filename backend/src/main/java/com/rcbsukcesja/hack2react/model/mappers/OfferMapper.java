package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.view.OfferView;
import com.rcbsukcesja.hack2react.model.entity.Offer;
import com.rcbsukcesja.hack2react.model.enums.OfferStatus;
import com.rcbsukcesja.hack2react.utils.TimeUtils;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;

@Mapper(componentModel = "spring")
public interface OfferMapper {

    @Mapping(source = "endDate", target = "closeDeadline", qualifiedByName = "endDateToCloseDeadline")
    @Mapping(target = "status", ignore = true)
    OfferView offerToOfferView(Offer offer);

    List<OfferView> offerListToOfferViewList(List<Offer> offers);

    @Named("endDateToCloseDeadline")
    default boolean endDateToCloseDeadline(LocalDate endDate) {
        return TimeUtils.isCloseDeadline(endDate);
    }

    default LocalDateTime UTCtoLocalDateTimeInZone(ZonedDateTime zonedDateTime) {
        return TimeUtils.toLocalDateTimeInZone(zonedDateTime);
    }

    @AfterMapping
    default void setStatus(Offer offer, @MappingTarget OfferView offerView) {
        if (TimeUtils.today().isBefore(offer.getStartDate())) {
            offerView.setStatus(OfferStatus.NOT_STARTED);
        } else if (TimeUtils.today().isAfter(offer.getEndDate())) {
            offerView.setStatus(OfferStatus.EXPIRED);
        } else {
            offerView.setStatus(OfferStatus.ACTIVE);
        }
    }
}
