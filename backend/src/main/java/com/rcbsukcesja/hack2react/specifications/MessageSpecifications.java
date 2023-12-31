package com.rcbsukcesja.hack2react.specifications;

import com.rcbsukcesja.hack2react.model.entity.Message;
import com.rcbsukcesja.hack2react.model.entity.User;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class MessageSpecifications {

    public static Specification<Message> hasSender(User sender) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("sender"), sender);
    }

    public static Specification<Message> hasReceiver(User receiver) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("receiver"), receiver);
    }

    public static Specification<Message> titleOrNameContain(final String search) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (search != null && !search.isBlank()) {
                predicates.add(criteriaBuilder.or(
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), "%" + search.toLowerCase() + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + search.toLowerCase() + "%")
                ));
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
