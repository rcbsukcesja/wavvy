package com.rcbsukcesja.hack2react.service;

import com.rcbsukcesja.hack2react.exceptions.badrequest.InvalidOfferScopeException;
import com.rcbsukcesja.hack2react.exceptions.badrequest.InvalidOfferStatusException;
import com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages;
import com.rcbsukcesja.hack2react.exceptions.notFound.OfferNotFoundException;
import com.rcbsukcesja.hack2react.exceptions.notFound.UserNotFoundException;
import com.rcbsukcesja.hack2react.model.dto.save.OfferPatchDto;
import com.rcbsukcesja.hack2react.model.dto.save.OfferSaveDto;
import com.rcbsukcesja.hack2react.model.dto.view.OfferView;
import com.rcbsukcesja.hack2react.model.entity.Offer;
import com.rcbsukcesja.hack2react.model.entity.User;
import com.rcbsukcesja.hack2react.model.enums.OfferScope;
import com.rcbsukcesja.hack2react.model.enums.OfferStatus;
import com.rcbsukcesja.hack2react.model.mappers.OfferMapper;
import com.rcbsukcesja.hack2react.repositories.OfferRepository;
import com.rcbsukcesja.hack2react.repositories.UserRepository;
import com.rcbsukcesja.hack2react.specifications.OfferSpecifications;
import com.rcbsukcesja.hack2react.utils.AuthenticationUtils;
import com.rcbsukcesja.hack2react.utils.OfferUtils;
import com.rcbsukcesja.hack2react.utils.TimeUtils;
import com.rcbsukcesja.hack2react.utils.TokenUtils;
import com.rcbsukcesja.hack2react.validations.DateValidation;
import com.rcbsukcesja.hack2react.validations.OfferValidation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OfferService {

    private final OfferMapper offerMapper;
    private final OfferRepository offerRepository;
    private final UserRepository userRepository;
    private final OfferValidation offerValidation;
    private final DateValidation dateValidation;

    public Page<OfferView> getAllOffers(LocalDate startDate, LocalDate endDate, Set<OfferStatus> offerStatuses,
                                        Set<OfferScope> offerScopes, Boolean closeDeadlineOnly, Boolean followedByUser,
                                        Pageable pageable, Authentication authentication) {
        UUID userId = TokenUtils.getUserId(authentication);

        offerScopes = setOfferScopes(offerScopes, authentication);
        checkOfferScopes(offerScopes, authentication);

        offerStatuses = setOfferStatuses(offerStatuses, authentication);
        checkOfferStatuses(offerStatuses, authentication);

        dateValidation.isStartDateBeforeOrEqualEndDate(startDate, endDate);
        Specification<Offer> spec = OfferSpecifications.notOutsideDateRange(startDate, endDate);
        if (offerStatuses != null && !offerStatuses.isEmpty()) {
            spec = spec.and(OfferSpecifications.isStatusIn(offerStatuses));
        }
        if (offerScopes != null && !offerScopes.isEmpty()) {
            spec = spec.and(OfferSpecifications.isOfferScopeIn(offerScopes));
        }
        if (closeDeadlineOnly != null && closeDeadlineOnly) {
            spec = spec.and(OfferSpecifications.isCloseDeadline());
        }
        if (followedByUser != null) {
            if (followedByUser) {
                spec = spec.and(OfferSpecifications.isFollowedByUser(userId));
            } else {
                spec = spec.and(OfferSpecifications.isNotFollowedByUser(userId));
            }
        }
        return offerRepository.findAll(spec, pageable).map(offerMapper::offerToOfferView);
    }

    public OfferView getOfferById(UUID id) {
        Offer offer = getOfferByIdOrThrowException(id);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Set<OfferScope> offerScopeSet = new HashSet<>();
        offerScopeSet.add(offer.getScope());
        checkOfferScopes(offerScopeSet, authentication);
        Set<OfferStatus> offerStatusSet = new HashSet<>();
        offerStatusSet.add(OfferUtils.getOfferStatus(offer));
        checkOfferStatuses(offerStatusSet, authentication);
        return offerMapper.offerToOfferView(offer);
    }

    @Transactional
    public OfferView createOffer(OfferSaveDto offerSaveDto) {
        Offer offer = new Offer();
        setBasicOfferFields(offerSaveDto, offer);
        offer.setFollowingUsers(new HashSet<>());
        Offer saved = offerRepository.saveAndFlush(offer);
        return offerMapper.offerToOfferView(saved);
    }

    @Transactional
    public OfferView putUpdateOffer(UUID offerId, OfferSaveDto offerSaveDto) {
        Offer offer = getOfferByIdOrThrowException(offerId);
        setBasicOfferFields(offerSaveDto, offer);
        offer.setUpdatedAt(TimeUtils.nowInUTC());
        Offer saved = offerRepository.saveAndFlush(offer);
        return offerMapper.offerToOfferView(saved);
    }

    @Transactional
    public OfferView patchUpdateOffer(UUID offerId, OfferPatchDto offerPatchDto) {
        Offer offer = getOfferByIdOrThrowException(offerId);
        boolean dateChanged = false;

        if (offerPatchDto.name() != null && !offerPatchDto.name().equals(offer.getName())) {
            offer.setName(offerPatchDto.name());
        }
        if (offerPatchDto.description() != null && !offerPatchDto.description().equals(offer.getDescription())) {
            offer.setDescription(offerPatchDto.description());
        }
        if (offerPatchDto.budget() != null && !offerPatchDto.budget().equals(offer.getBudget())) {
            offer.setBudget(offerPatchDto.budget());
        }
        if (offerPatchDto.fundingLevel() != null && !offerPatchDto.fundingLevel().equals(offer.getFundingLevel())) {
            offer.setFundingLevel(offerPatchDto.fundingLevel());
        }
        if (offerPatchDto.targetAudience() != null && !offerPatchDto.targetAudience().equals(offer.getTargetAudience())) {
            offer.setTargetAudience(offerPatchDto.targetAudience());
        }
        if (offerPatchDto.link() != null && !offerPatchDto.link().equals(offer.getLink())) {
            offer.setLink(offerPatchDto.link());
        }
        if (offerPatchDto.startDate() != null && !offerPatchDto.startDate().equals(offer.getStartDate())) {
            offer.setStartDate(offerPatchDto.startDate());
            dateChanged = true;
        }
        if (offerPatchDto.endDate() != null && !offerPatchDto.endDate().equals(offer.getEndDate())) {
            offer.setEndDate(offerPatchDto.endDate());
            dateChanged = true;
        }
        if (offerPatchDto.scope() != null && !offerPatchDto.scope().equals(offer.getScope())) {
            offer.setScope(offerPatchDto.scope());
        }

        if (dateChanged) {
            offerValidation.validateDates(offer.getStartDate(), offer.getEndDate());
        }

        offer.setUpdatedAt(TimeUtils.nowInUTC());
        Offer saved = offerRepository.saveAndFlush(offer);
        return offerMapper.offerToOfferView(saved);
    }

    @Transactional
    public void followOffer(UUID offerId, UUID userId) {
        Offer offer = getOfferByIdOrThrowException(offerId);
        User user = geUserByIdOrThrowException(userId);
        if (user.getFollowedOffers().contains(offer)) {
            offer.getFollowingUsers().remove(user);
            user.getFollowedOffers().remove(offer);
        } else {
            offer.getFollowingUsers().add(user);
            user.getFollowedOffers().add(offer);
        }
        offerRepository.saveAndFlush(offer);
        userRepository.saveAndFlush(user);
    }

    private void setBasicOfferFields(OfferSaveDto offerSaveDto, Offer offer) {
        offer.setName(offerSaveDto.name());
        offer.setDescription(offerSaveDto.description());
        offer.setBudget(offerSaveDto.budget());
        offer.setFundingLevel(offerSaveDto.fundingLevel());
        offer.setTargetAudience(offerSaveDto.targetAudience());
        offer.setLink(offerSaveDto.link());
        offer.setStartDate(offerSaveDto.startDate());
        offer.setEndDate(offerSaveDto.endDate());
        offer.setScope(offerSaveDto.scope());
        offerValidation.validateDates(offer.getStartDate(), offer.getEndDate());
    }

    @Transactional
    public void deleteOffer(UUID id) {
        Offer offer = getOfferByIdOrThrowException(id);
        offerRepository.delete(offer);
    }

    public Offer getOfferByIdOrThrowException(UUID id) {
        return offerRepository.getOfferById(id)
                .orElseThrow(() -> new OfferNotFoundException(
                        ErrorMessages.OFFER_NOT_FOUND, id));
    }

    public User geUserByIdOrThrowException(UUID id) {
        return userRepository.getUserById(id)
                .orElseThrow(() -> new UserNotFoundException(
                        ErrorMessages.USER_NOT_FOUND, id));
    }

    private static Set<OfferScope> setOfferScopes(Set<OfferScope> offerScopes, Authentication authentication) {
        if (offerScopes == null || offerScopes.isEmpty()) {
            if (authentication == null) {
                offerScopes = OfferScope.getAllowedOfferScopes(OfferScope.offerScopesNotPublic());
            } else if (AuthenticationUtils.hasRole(authentication, "ROLE_NGO")) {
                offerScopes = OfferScope.getAllowedOfferScopes(OfferScope.offerScopesNotForNgo());
            } else if (AuthenticationUtils.hasRole(authentication, "ROLE_COMPANY")) {
                offerScopes = OfferScope.getAllowedOfferScopes(OfferScope.offerScopesNotForCompany());
            } else if (AuthenticationUtils.hasRole(authentication, "ROLE_CITY_HALL")) {
                offerScopes = Arrays.stream(OfferScope.values()).collect(Collectors.toSet());
            }
        }
        return offerScopes;
    }

    private static void checkOfferScopes(Set<OfferScope> offerScopes, Authentication authentication) {
        if (authentication == null) {
            if (OfferScope.isOfferScopeNotAllowed(offerScopes, OfferScope.offerScopesNotPublic())) {
                throw new InvalidOfferScopeException(ErrorMessages.INVALID_OFFER_SCOPE);
            } else {
                return;
            }
        }

        if (AuthenticationUtils.hasRole(authentication, "ROLE_NGO")
                && OfferScope.isOfferScopeNotAllowed(offerScopes, OfferScope.offerScopesNotForNgo())
                || AuthenticationUtils.hasRole(authentication, "ROLE_COMPANY")
                && OfferScope.isOfferScopeNotAllowed(offerScopes, OfferScope.offerScopesNotForCompany())
        ) {
            throw new InvalidOfferScopeException(ErrorMessages.INVALID_OFFER_SCOPE);
        }
    }

    private static Set<OfferStatus> setOfferStatuses(Set<OfferStatus> offerStatuses, Authentication authentication) {
        if (offerStatuses == null || offerStatuses.isEmpty()) {
            if (authentication == null) {
                offerStatuses = OfferStatus.getAllowedOfferStatuses(OfferStatus.offerStatusesNotPublic());
            } else if (AuthenticationUtils.hasRole(authentication, "ROLE_NGO")) {
                offerStatuses = OfferStatus.getAllowedOfferStatuses(OfferStatus.offerStatusesNotForNgo());
            } else if (AuthenticationUtils.hasRole(authentication, "ROLE_COMPANY")) {
                offerStatuses = OfferStatus.getAllowedOfferStatuses(OfferStatus.offerStatusesNotForCompany());
            } else if (AuthenticationUtils.hasRole(authentication, "ROLE_CITY_HALL")) {
                offerStatuses = Arrays.stream(OfferStatus.values()).collect(Collectors.toSet());
            }
        }
        return offerStatuses;
    }

    private static void checkOfferStatuses(Set<OfferStatus> offerStatuses, Authentication authentication) {
        if (authentication != null && AuthenticationUtils.hasRole(authentication, "ROLE_CITY_HALL")) {
            return;
        }
        if (authentication == null) {
            if (OfferStatus.isOfferStatusNotAllowed(offerStatuses, OfferStatus.offerStatusesNotPublic())) {
                throw new InvalidOfferStatusException(ErrorMessages.INVALID_OFFER_STATUS);
            }
        } else if (AuthenticationUtils.hasRole(authentication, "ROLE_NGO")
                && OfferStatus.isOfferStatusNotAllowed(offerStatuses, OfferStatus.offerStatusesNotForNgo())
                || AuthenticationUtils.hasRole(authentication, "ROLE_COMPANY")
                && OfferStatus.isOfferStatusNotAllowed(offerStatuses, OfferStatus.offerStatusesNotForCompany())
        ) {
            throw new InvalidOfferScopeException(ErrorMessages.INVALID_OFFER_SCOPE);
        }
    }

}
