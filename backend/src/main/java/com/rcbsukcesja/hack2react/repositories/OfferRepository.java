package com.rcbsukcesja.hack2react.repositories;

import com.rcbsukcesja.hack2react.model.entity.Offer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface OfferRepository extends JpaRepository<Offer, UUID> {
    Offer getOfferById(UUID id);
}
