package com.rcbsukcesja.hack2react.validations;

import com.rcbsukcesja.hack2react.exceptions.badrequest.InvalidDateRangeException;
import com.rcbsukcesja.hack2react.model.entity.Offer;
import com.rcbsukcesja.hack2react.utils.TimeUtils;
import org.springframework.stereotype.Component;

import static com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages.OFFER_DATE_END_IN_PAST_VALIDATION_MESSAGE;
import static com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages.OFFER_DATE_START_AFTER_END_VALIDATION_MESSAGE;

@Component
public class OfferValidation {

    public void validateDates(Offer offer) {
        if (offer.getStartDate().isAfter(offer.getEndDate())) {
            throw new InvalidDateRangeException(OFFER_DATE_START_AFTER_END_VALIDATION_MESSAGE);
        }
        if (offer.getEndDate().isBefore(TimeUtils.today())) {
            throw new InvalidDateRangeException(OFFER_DATE_END_IN_PAST_VALIDATION_MESSAGE);
        }
    }
}
