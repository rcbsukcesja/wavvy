package com.rcbsukcesja.hack2react.repositories;

import com.rcbsukcesja.hack2react.model.entity.BusinessArea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface BusinessAreaRepository extends JpaRepository<BusinessArea, UUID> {

    Optional<BusinessArea> getBusinessAreaById(UUID id);

    boolean existsByNameIgnoreCase(String name);
}
