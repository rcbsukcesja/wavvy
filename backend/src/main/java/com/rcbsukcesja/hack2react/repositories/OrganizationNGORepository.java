package com.rcbsukcesja.hack2react.repositories;

import com.rcbsukcesja.hack2react.model.entity.OrganizationNGO;
import com.rcbsukcesja.hack2react.model.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrganizationNGORepository extends JpaRepository<OrganizationNGO, UUID> {

    @EntityGraph(attributePaths = {
            "owner",
            "socialLinks",
            "businessAreas",
            "resources",
            "tags"
    })
    @NonNull
    Page<OrganizationNGO> findAll(@Nullable Specification<OrganizationNGO> spec, @Nullable Pageable pageable);

    @EntityGraph(attributePaths = {
            "projects",
            "owner",
            "socialLinks",
            "businessAreas",
            "resources",
            "tags"
    })
    Optional<OrganizationNGO> getOrganizationNGOById(UUID id);

    OrganizationNGO getOrganizationNGOByOwner(User owner);

    Optional<OrganizationNGO> getOrganizationNGOByOwner_Id(UUID ownerId);
}
