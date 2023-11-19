package com.rcbsukcesja.hack2react.model.enums;

import com.rcbsukcesja.hack2react.exceptions.badrequest.InvalidEnumParameterException;
import com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages;

import java.util.Arrays;
import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

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

    public static Set<OfferScope> offerScopesNotForNgo() {
        return Set.of(HIDDEN);
    }

    public static Set<OfferScope> offerScopesNotForCompany() {
        return Set.of(HIDDEN, NGO_ONLY);
    }

    public static Set<OfferScope> offerScopesNotPublic() {
        return Set.of(HIDDEN, NGO_ONLY, NGO_AND_COMPANY);
    }

    public static boolean isOfferScopeNotAllowed(Collection<OfferScope> offerScopes, Set<OfferScope> notAllowedOfferScopes) {
        return offerScopes.stream().anyMatch(notAllowedOfferScopes::contains);
    }

    public static Set<OfferScope> getAllowedOfferScopes(Set<OfferScope> notAllowedOfferScopes) {
        return Arrays.stream(OfferScope.values())
                .filter(e -> !notAllowedOfferScopes.contains(e))
                .collect(Collectors.toSet());
    }

}
