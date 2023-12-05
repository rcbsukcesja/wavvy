package com.rcbsukcesja.hack2react.model.entity;

import com.rcbsukcesja.hack2react.utils.TimeUtils;
import jakarta.persistence.CascadeType;
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
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.time.ZonedDateTime;
import java.util.Set;
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
@ToString
public abstract class Organization {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false)
    private String name;
    @OneToOne(mappedBy = "organization", fetch = FetchType.LAZY)
    private User owner;
    private Address address;
    private String phone;
    private String email;
    private String website;
    private String logoPath;
    private String logoUrl;

    @OneToMany(mappedBy = "organization", cascade = CascadeType.MERGE, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<SocialLink> socialLinks;
    @Column(columnDefinition = "TIMESTAMP", nullable = false)
    private ZonedDateTime createdAt;
    @Column(columnDefinition = "TIMESTAMP", nullable = false)
    private ZonedDateTime updatedAt;
    @Column(length = 2000)
    private String description;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH}, fetch = FetchType.LAZY)
    @JoinTable(
            name = "organization_business_areas",
            schema = "wavvy",
            joinColumns = {@JoinColumn(name = "organization_id")},
            inverseJoinColumns = {@JoinColumn(name = "business_area_id")}
    )
    private Set<BusinessArea> businessAreas;
    private String krs;
    private String nip;
    private String regon;

    @OneToMany(mappedBy = "organization", cascade = CascadeType.MERGE, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<Resource> resources;
    private boolean confirmed;
    @Column(length = 2000)
    private String reason;
    private boolean disabled;

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
