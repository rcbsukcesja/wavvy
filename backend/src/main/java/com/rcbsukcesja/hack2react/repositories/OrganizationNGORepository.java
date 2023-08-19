package com.rcbsukcesja.hack2react.repositories;

import com.rcbsukcesja.hack2react.model.entity.OrganizationNGO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrganizationNGORepository extends JpaRepository<OrganizationNGO, UUID> {

    Optional<OrganizationNGO> getOrganizationNGOById(UUID id);

    Boolean existsByNameIgnoreCase(String name);

    Boolean existsByKRS(String krs);

    Boolean existsByNIP(String nip);

    Boolean existsByREGON(String regon);
}
