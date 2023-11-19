package com.rcbsukcesja.hack2react.storage.user.entity;

import com.rcbsukcesja.hack2react.storage.user.utils.TimeUtils;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.ZonedDateTime;
import java.util.UUID;


@Entity
@Table(name = "organizations", schema = "wavvy")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
@SuperBuilder
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "organization_type", discriminatorType = DiscriminatorType.STRING)
public abstract class Organization {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String name;
    @OneToOne(mappedBy = "organization", fetch = FetchType.LAZY)
    private CustomUserEntity owner;

    @Column(name = "CREATED_AT", columnDefinition = "TIMESTAMP", nullable = false)
    private ZonedDateTime createdAt;
    @Column(name = "UPDATED_AT", columnDefinition = "TIMESTAMP", nullable = false)
    private ZonedDateTime updatedAt;

    private String krs;
    private String nip;
    private String regon;

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
