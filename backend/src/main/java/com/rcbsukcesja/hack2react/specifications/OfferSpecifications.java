package com.rcbsukcesja.hack2react.specifications;

import com.rcbsukcesja.hack2react.model.entity.Offer;
import com.rcbsukcesja.hack2react.model.entity.User;
import com.rcbsukcesja.hack2react.model.enums.OfferScope;
import com.rcbsukcesja.hack2react.model.enums.OfferStatus;
import com.rcbsukcesja.hack2react.utils.TimeUtils;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.SetJoin;
import jakarta.persistence.criteria.Subquery;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;

public class OfferSpecifications {

    public static Specification<Offer> notOutsideDateRange(LocalDate startDate, LocalDate endDate) {
        return (root, query, criteriaBuilder) -> {

            List<Predicate> predicates = new ArrayList<>();

            if (startDate != null) {
                // startTime AND endTime should NOT be before startDate
                Predicate notBothBeforeStart = criteriaBuilder.not(
                        criteriaBuilder.and(
                                criteriaBuilder.lessThan(root.get("startDate"), startDate),
                                criteriaBuilder.lessThan(root.get("endDate"), startDate)
                        )
                );
                predicates.add(notBothBeforeStart);
            }

            if (endDate != null) {
                // startTime AND endTime should NOT be after the endDate
                Predicate notBothAfterEnd = criteriaBuilder.not(
                        criteriaBuilder.and(
                                criteriaBuilder.greaterThan(root.get("startDate"), endDate),
                                criteriaBuilder.greaterThan(root.get("endDate"), endDate)
                        )
                );
                predicates.add(notBothAfterEnd);
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    public static Specification<Offer> isOfferScopeIn(Set<OfferScope> offerScopes) {
        return (root, query, criteriaBuilder) -> {
            Predicate predicate = root.get("scope").in(offerScopes);
            return query.where(predicate).getRestriction();
        };
    }

    public static Specification<Offer> isCloseDeadline() {
        return (root, query, criteriaBuilder) -> {
            LocalDate today = TimeUtils.today();
            LocalDate weekAfter = today.plusDays(TimeUtils.CLOSE_DEADLINE_DAYS);
            return criteriaBuilder.and(
                    criteriaBuilder.greaterThanOrEqualTo(root.get("endDate"), today),
                    criteriaBuilder.lessThan(root.get("endDate"), weekAfter)
            );
        };
    }

    public static Specification<Offer> isStatusIn(Set<OfferStatus> offerStatuses) {
        return (root, query, criteriaBuilder) -> {

            List<Predicate> predicates = new ArrayList<>();

            if (offerStatuses.contains(OfferStatus.ACTIVE)) {
                Predicate activePredicate = criteriaBuilder.and(
                        criteriaBuilder.lessThanOrEqualTo(root.get("startDate"), TimeUtils.today()),
                        criteriaBuilder.greaterThanOrEqualTo(root.get("endDate"), TimeUtils.today())
                );
                predicates.add(activePredicate);
            }
            if (offerStatuses.contains(OfferStatus.NOT_STARTED)) {
                Predicate notStartedPredicate = criteriaBuilder.greaterThan(root.get("startDate"), TimeUtils.today());
                predicates.add(notStartedPredicate);
            }
            if (offerStatuses.contains(OfferStatus.EXPIRED)) {
                Predicate expiredPredicate = criteriaBuilder.lessThan(root.get("endDate"), TimeUtils.today());
                predicates.add(expiredPredicate);
            }
            return criteriaBuilder.or(predicates.toArray(new Predicate[0]));
        };
    }

    public static Specification<Offer> isFollowedByUser(UUID userId) {
        return ((root, query, criteriaBuilder) -> {
            Subquery<Offer> followedOffersSubquery = getFollowedOffersSubquery(userId, query, criteriaBuilder);
            return criteriaBuilder.in(root).value(followedOffersSubquery);
        });
    }

    public static Specification<Offer> isNotFollowedByUser(UUID userId) {
        return (root, query, criteriaBuilder) -> {
            Subquery<Offer> followedOffersSubquery = getFollowedOffersSubquery(userId, query, criteriaBuilder);
            return criteriaBuilder.not(criteriaBuilder.in(root).value(followedOffersSubquery));
        };
    }

    private static Subquery<Offer> getFollowedOffersSubquery(UUID userId, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        Subquery<Offer> followedOffersSubquery = query.subquery(Offer.class);
        Root<Offer> followedOffersRoot = followedOffersSubquery.from(Offer.class);
        SetJoin<Offer, User> followedUsers = followedOffersRoot.joinSet("followingUsers");
        followedOffersSubquery.select(followedOffersRoot);
        followedOffersSubquery.where(criteriaBuilder.equal(followedUsers.get("id"), userId));
        return followedOffersSubquery;
    }
}
