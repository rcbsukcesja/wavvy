package com.rcbsukcesja.hack2react.validations;

import com.rcbsukcesja.hack2react.exceptions.badrequest.InvalidDateRangeException;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

import static com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages.DATE_START_AFTER_END_VALIDATION_MESSAGE;

@Component
public class DateValidation {

    public void isStartDateBeforeOrEqualEndDate(LocalDate startDate, LocalDate endDate) {
        if (startDate != null && endDate != null && startDate.isAfter(endDate)) {
            throw new InvalidDateRangeException(DATE_START_AFTER_END_VALIDATION_MESSAGE);
        }
    }
}
