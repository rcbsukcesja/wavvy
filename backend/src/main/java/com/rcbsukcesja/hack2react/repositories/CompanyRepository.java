package com.rcbsukcesja.hack2react.repositories;

import com.rcbsukcesja.hack2react.model.entity.Company;
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
public interface CompanyRepository extends JpaRepository<Company, UUID> {

    @EntityGraph(attributePaths = {
            "owner",
            "socialLinks",
            "businessAreas",
            "resources"
    })
    @NonNull
    Page<Company> findAll(@Nullable Specification<Company> spec, @Nullable Pageable pageable);

    @EntityGraph(attributePaths = {
            "owner",
            "socialLinks",
            "businessAreas",
            "resources"
    })
    Optional<Company> getCompanyById(UUID id);

    Company getCompanyByOwner(User owner);
}
