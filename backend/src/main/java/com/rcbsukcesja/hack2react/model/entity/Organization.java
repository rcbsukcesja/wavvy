package com.rcbsukcesja.hack2react.model.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "ORGANIZATIONS")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
@SuperBuilder
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Organization {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String name;
    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name = "owner_id", referencedColumnName = "id")
    private User owner;
    private String address;
    private String phone;
    private String email;
    private String website;

    @Lob
    @Column(columnDefinition = "BLOB")
    private byte[] logo;

    @ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "socialLinks", joinColumns = @JoinColumn(name = "socialLink_id"))
    @Column(name = "socialLink", nullable = false)
    private List<String> socialLinks;
    private LocalDate creationDate;
    private String description;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH})
    @JoinTable(
            name = "organization_business_areas",
            joinColumns = {@JoinColumn(name = "organization_id")},
            inverseJoinColumns = {@JoinColumn(name = "business_area_id")}
    )
    private List<BusinessArea> businessAreas;
    private String KRS;
    private String NIP;
    private String REGON;

    @ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "resources", joinColumns = @JoinColumn(name = "resource_id"))
    @Column(name = "resource", nullable = false)
    private List<String> resource;

}
