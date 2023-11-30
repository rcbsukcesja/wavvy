package com.rcbsukcesja.hack2react.model.entity;

import com.rcbsukcesja.hack2react.model.enums.OfferScope;
import com.rcbsukcesja.hack2react.utils.TimeUtils;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.Set;
import java.util.UUID;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "id")
@Table(name = "offers", schema = "wavvy")
public class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false)
    private String name;
    @Column(length = 2000)
    private String description;
    private BigDecimal budget;
    private int fundingLevel;
    private String targetAudience;
    private String link;
    private LocalDate startDate;
    private LocalDate endDate;

    @Column(columnDefinition = "TIMESTAMP", nullable = false)
    private ZonedDateTime createdAt;
    @Column(columnDefinition = "TIMESTAMP", nullable = false)
    private ZonedDateTime updatedAt;

    @Enumerated(EnumType.STRING)
    private OfferScope scope;

    @ManyToMany(mappedBy = "followedOffers", cascade = {CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH}, fetch = FetchType.LAZY)
    private Set<User> followingUsers;

    @PrePersist
    public void prePersist() {
        if (createdAt == null) {
            createdAt = TimeUtils.nowInUTC();
        }
        if (updatedAt == null) {
            updatedAt = createdAt;
        }
    }
}
