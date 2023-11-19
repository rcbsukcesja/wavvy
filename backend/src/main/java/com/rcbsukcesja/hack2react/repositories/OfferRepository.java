package com.rcbsukcesja.hack2react.repositories;

import com.rcbsukcesja.hack2react.model.entity.Offer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

import java.util.Optional;
import java.util.UUID;

public interface OfferRepository extends JpaRepository<Offer, UUID>, JpaSpecificationExecutor<Offer> {

    @NonNull
    @EntityGraph(attributePaths = {"followingUsers"})
    Page<Offer> findAll(@Nullable Specification<Offer> spec, @Nullable Pageable pageable);

    @EntityGraph(attributePaths = {"followingUsers"})
    Optional<Offer> getOfferById(UUID id);
}
