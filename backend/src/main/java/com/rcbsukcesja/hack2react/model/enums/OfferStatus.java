package com.rcbsukcesja.hack2react.model.enums;

import com.rcbsukcesja.hack2react.exceptions.badrequest.InvalidEnumParameterException;
import com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages;

import java.util.Arrays;

public enum OfferStatus {

    NOT_STARTED,
    ACTIVE,
    EXPIRED;

    public static OfferStatus getByName(String name) {
        return Arrays.stream(OfferStatus.values())
                .filter(e -> e.name().equals(name))
                .findFirst()
                .orElseThrow(() -> new InvalidEnumParameterException(ErrorMessages.INVALID_ENUM_NAME, name));
    }
}
