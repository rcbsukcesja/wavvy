package com.rcbsukcesja.hack2react.utils;

import com.rcbsukcesja.hack2react.model.entity.Offer;
import com.rcbsukcesja.hack2react.model.enums.OfferStatus;
import lombok.experimental.UtilityClass;

@UtilityClass
public class OfferUtils {


    public static OfferStatus getOfferStatus(Offer offer) {
        if (TimeUtils.today().isBefore(offer.getStartDate())) {
            return OfferStatus.NOT_STARTED;
        } else if (TimeUtils.today().isAfter(offer.getEndDate())) {
            return OfferStatus.EXPIRED;
        } else {
            return OfferStatus.ACTIVE;
        }
    }

}
