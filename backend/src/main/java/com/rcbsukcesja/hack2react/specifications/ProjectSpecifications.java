package com.rcbsukcesja.hack2react.specifications;

import com.rcbsukcesja.hack2react.model.entity.Project;
import com.rcbsukcesja.hack2react.model.enums.ProjectStatus;
import com.rcbsukcesja.hack2react.utils.TimeUtils;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZonedDateTime;
import java.util.List;

public class ProjectSpecifications {

    public static Specification<Project> notOutsideDateRange(LocalDate startDate, LocalDate endDate) {
        return (root, query, criteriaBuilder) -> {

            Predicate finalPredicate = criteriaBuilder.conjunction();

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
                finalPredicate = criteriaBuilder.and(finalPredicate, notBothBeforeStart);
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
                finalPredicate = criteriaBuilder.and(finalPredicate, notBothAfterEnd);
            }

            return finalPredicate;
        };
    }

    public static Specification<Project> statusInStatusList(List<ProjectStatus> statusList) {
        return (root, query, criteriaBuilder) -> {
            Predicate predicate = root.get("status").in(statusList);
            return query.where(predicate).getRestriction();
        };
    }
}
