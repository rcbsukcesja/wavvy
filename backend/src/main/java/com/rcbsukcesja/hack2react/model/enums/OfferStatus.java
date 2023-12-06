package com.rcbsukcesja.hack2react.model.enums;

import com.rcbsukcesja.hack2react.exceptions.badrequest.InvalidEnumParameterException;
import com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages;

import java.util.Arrays;
import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

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

    public static Set<OfferStatus> offerStatusesNotForNgo() {
        return Set.of(EXPIRED);
    }

    public static Set<OfferStatus> offerStatusesNotForCompany() {
        return Set.of(EXPIRED);
    }

    public static Set<OfferStatus> offerStatusesNotPublic() {
        return Set.of(EXPIRED);
    }

    public static boolean isOfferStatusNotAllowed(Collection<OfferStatus> offerStatuses, Set<OfferStatus> notAllowedOfferStatuss) {
        return offerStatuses.stream().anyMatch(notAllowedOfferStatuss::contains);
    }

    public static Set<OfferStatus> getAllowedOfferStatuses(Set<OfferStatus> notAllowedOfferStatuses) {
        return Arrays.stream(OfferStatus.values())
                .filter(e -> !notAllowedOfferStatuses.contains(e))
                .collect(Collectors.toSet());
    }
}
