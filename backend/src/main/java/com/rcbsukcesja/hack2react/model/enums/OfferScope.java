package com.rcbsukcesja.hack2react.model.enums;

import com.rcbsukcesja.hack2react.exceptions.badrequest.InvalidEnumParameterException;
import com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages;

import java.util.Arrays;

public enum OfferScope {

    HIDDEN,
    PUBLIC,
    NGO_ONLY,
    NGO_AND_COMPANY;

    public static OfferScope getByName(String name) {
        return Arrays.stream(OfferScope.values())
                .filter(e -> e.name().equals(name))
                .findFirst()
                .orElseThrow(() -> new InvalidEnumParameterException(ErrorMessages.INVALID_ENUM_NAME, name));
    }
}
