package com.rcbsukcesja.hack2react.repositories;

import com.rcbsukcesja.hack2react.model.entity.OrganizationNGO;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrganizationNGORepository extends JpaRepository<OrganizationNGO, UUID> {

    @Query("SELECT ngo FROM OrganizationNGO ngo")
    @EntityGraph(attributePaths = {
            "owner",
            "socialLinks",
            "businessAreas",
            "resources"
    })
    List<OrganizationNGO> getAll();

    @EntityGraph(attributePaths = {
            "projects",
            "owner",
            "socialLinks",
            "businessAreas",
            "resources"
    })
    Optional<OrganizationNGO> getOrganizationNGOById(UUID id);

    boolean existsByNameIgnoreCase(String name);

    boolean existsByKrs(String krs);

    boolean existsByNip(String nip);

    boolean existsByRegon(String regon);
}
