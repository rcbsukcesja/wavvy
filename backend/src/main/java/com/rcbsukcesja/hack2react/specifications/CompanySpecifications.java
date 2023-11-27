package com.rcbsukcesja.hack2react.specifications;

import com.rcbsukcesja.hack2react.model.entity.Company;
import com.rcbsukcesja.hack2react.model.entity.Resource;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

public class CompanySpecifications {

    public static Specification<Company> isNotDisabledAndConfirmed() {
        return (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.and(
                    criteriaBuilder.isFalse(root.get("disabled")),
                    criteriaBuilder.isTrue(root.get("confirmed"))
            );
            return query.where(predicate).getRestriction();
        };
    }

    public static Specification<Company> nameOrResourcesContain(final String search) {
        return (root, query, criteriaBuilder) -> {
            Join<Company, Resource> resourcesJoin = root.join("resources");
            Predicate predicate = criteriaBuilder.or(
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + search.toLowerCase() + "%"),
                    criteriaBuilder.like(criteriaBuilder.lower(resourcesJoin.get("resource")), "%" + search.toLowerCase() + "%")
            );
            return query.where(predicate).getRestriction();
        };
    }
}
