package com.rcbsukcesja.hack2react.specifications;

import com.rcbsukcesja.hack2react.model.entity.Project;
import com.rcbsukcesja.hack2react.model.entity.ProjectTag;
import com.rcbsukcesja.hack2react.model.enums.ProjectStatus;
import com.rcbsukcesja.hack2react.utils.TimeUtils;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class ProjectSpecifications {

    public static Specification<Project> notOutsideDateRange(LocalDate startDate, LocalDate endDate) {
        return (root, query, criteriaBuilder) -> {

            List<Predicate> predicates = new ArrayList<>();

            if (startDate != null) {
                // Beginning of startDate at 00:00:00
                ZonedDateTime startOfDay = TimeUtils.zonedDateTimeInUTC(ZonedDateTime.of(startDate, LocalTime.MIN, TimeUtils.ZONE_ID));

                // startTime AND endTime should NOT be before the start of startDate
                Predicate notBothBeforeStart = criteriaBuilder.not(
                        criteriaBuilder.and(
                                criteriaBuilder.lessThan(root.get("startTime"), startOfDay),
                                criteriaBuilder.lessThan(root.get("endTime"), startOfDay)
                        )
                );
                predicates.add(notBothBeforeStart);
            }

            if (endDate != null) {
                // End of endDate at 23:59:59
                ZonedDateTime endOfDay = TimeUtils.zonedDateTimeInUTC(ZonedDateTime.of(endDate, LocalTime.MAX, TimeUtils.ZONE_ID));

                // startTime AND endTime should NOT be after the end of endDate
                Predicate notBothAfterEnd = criteriaBuilder.not(
                        criteriaBuilder.and(
                                criteriaBuilder.greaterThan(root.get("startTime"), endOfDay),
                                criteriaBuilder.greaterThan(root.get("endTime"), endOfDay)
                        )
                );
                predicates.add(notBothAfterEnd);
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    public static Specification<Project> statusInStatusList(Set<ProjectStatus> statuses) {
        return (root, query, criteriaBuilder) -> {
            Predicate predicate = root.get("status").in(statuses);
            return query.where(predicate).getRestriction();
        };
    }

    public static Specification<Project> nameOrTagsContain(final String search) {
        return (root, query, criteriaBuilder) -> {
            Join<Project, ProjectTag> tagsJoin = root.join("tags");
            Predicate predicate = criteriaBuilder.or(
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + search.toLowerCase() + "%"),
                    criteriaBuilder.like(criteriaBuilder.lower(tagsJoin.get("tag")), "%" + search.toLowerCase() + "%")
            );
            return query.where(predicate).getRestriction();
        };
    }

    public static Specification<Project> isNotDisabled() {
        return (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.isFalse(root.get("disabled"));
            return query.where(predicate).getRestriction();
        };
    }
}
