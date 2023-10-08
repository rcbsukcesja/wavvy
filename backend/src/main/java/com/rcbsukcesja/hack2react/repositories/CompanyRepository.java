package com.rcbsukcesja.hack2react.repositories;

import com.rcbsukcesja.hack2react.model.entity.Company;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CompanyRepository extends JpaRepository<Company, UUID> {

    @Query("SELECT c FROM Company c")
    @EntityGraph(attributePaths = {
            "owner",
            "socialLinks",
            "businessAreas",
            "resources"
    })
    List<Company> getAll();

    @EntityGraph(attributePaths = {
            "owner",
            "socialLinks",
            "businessAreas",
            "resources"
    })
    Optional<Company> getCompanyById(UUID id);

    boolean existsByNameIgnoreCase(String name);

    boolean existsByKrs(String krs);

    boolean existsByNip(String nip);

    boolean existsByRegon(String regon);
}
