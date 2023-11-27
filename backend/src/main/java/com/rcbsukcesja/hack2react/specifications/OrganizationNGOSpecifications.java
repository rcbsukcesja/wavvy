package com.rcbsukcesja.hack2react.specifications;

import com.rcbsukcesja.hack2react.model.entity.OrganizationNGO;
import com.rcbsukcesja.hack2react.model.entity.OrganizationNGOTag;
import com.rcbsukcesja.hack2react.model.entity.Resource;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

public class OrganizationNGOSpecifications {

    public static Specification<OrganizationNGO> isNotDisabledAndConfirmed() {
        return (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.and(
                    criteriaBuilder.isFalse(root.get("disabled")),
                    criteriaBuilder.isTrue(root.get("confirmed"))
            );
            return query.where(predicate).getRestriction();
        };
    }

    public static Specification<OrganizationNGO> nameOrTagsOrResourcesContain(final String search) {
        return (root, query, criteriaBuilder) -> {
            Join<OrganizationNGO, OrganizationNGOTag> tagsJoin = root.join("tags");
            Join<OrganizationNGO, Resource> resourcesJoin = root.join("resources");
            Predicate predicate = criteriaBuilder.or(
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + search.toLowerCase() + "%"),
                    criteriaBuilder.like(criteriaBuilder.lower(tagsJoin.get("tag")), "%" + search.toLowerCase() + "%"),
                    criteriaBuilder.like(criteriaBuilder.lower(resourcesJoin.get("resource")), "%" + search.toLowerCase() + "%")
            );
            return query.where(predicate).getRestriction();
        };
    }
}
