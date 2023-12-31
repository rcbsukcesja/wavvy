package com.rcbsukcesja.hack2react.repositories;

import com.rcbsukcesja.hack2react.model.entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, UUID> {

    boolean existsByNameIgnoreCase(String name);

    boolean existsByKrs(String krs);

    boolean existsByNip(String nip);

    boolean existsByRegon(String regon);

    List<Organization> findAllByNameIgnoreCase(String name);
    List<Organization> findAllByKrs(String krs);
    List<Organization> findAllByNip(String nip);
    List<Organization> findAllByRegon(String regon);
}
