package com.rcbsukcesja.hack2react.specifications;

import com.rcbsukcesja.hack2react.model.entity.Offer;
import com.rcbsukcesja.hack2react.model.enums.OfferScope;
import com.rcbsukcesja.hack2react.utils.TimeUtils;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.util.List;

public class OfferSpecifications {

    public static Specification<Offer> notOutsideDateRange(LocalDate startDate, LocalDate endDate) {
        return (root, query, criteriaBuilder) -> {

            Predicate finalPredicate = criteriaBuilder.conjunction();

            if (startDate != null) {
                // startTime AND endTime should NOT be before startDate
                Predicate notBothBeforeStart = criteriaBuilder.not(
                        criteriaBuilder.and(
                                criteriaBuilder.lessThan(root.get("startDate"), startDate),
                                criteriaBuilder.lessThan(root.get("endDate"), startDate)
                        )
                );
                finalPredicate = criteriaBuilder.and(finalPredicate, notBothBeforeStart);
            }

            if (endDate != null) {
                // startTime AND endTime should NOT be after the endDate
                Predicate notBothAfterEnd = criteriaBuilder.not(
                        criteriaBuilder.and(
                                criteriaBuilder.greaterThan(root.get("startDate"), endDate),
                                criteriaBuilder.greaterThan(root.get("endDate"), endDate)
                        )
                );
                finalPredicate = criteriaBuilder.and(finalPredicate, notBothAfterEnd);
            }

            return finalPredicate;
        };
    }

    public static Specification<Offer> isOfferScopeIn(List<OfferScope> offerScopes) {
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
}
