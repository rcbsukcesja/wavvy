package com.rcbsukcesja.hack2react.model.entity;

import com.rcbsukcesja.hack2react.model.enums.ProjectStatus;
import com.rcbsukcesja.hack2react.utils.TimeUtils;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(name = "projects", schema = "wavvy")
@ToString
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false)
    private String name;
    @Column(length = 2000)
    private String description;
    private Address address;
    private String imagePath;
    private String imageLink;
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<ProjectLink> links;
    @Column(columnDefinition = "TIMESTAMP", nullable = false)
    private ZonedDateTime startTime;
    @Column(columnDefinition = "TIMESTAMP", nullable = false)
    private ZonedDateTime endTime;
    private BigDecimal budget;
    private String cooperationMessage;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH}, fetch = FetchType.LAZY)
    private OrganizationNGO organizer;

    @Column(columnDefinition = "INTEGER")
    private ProjectStatus status;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<ProjectTag> tags;

    private boolean possibleVolunteer;

    @Column(columnDefinition = "TIMESTAMP", nullable = false)
    private ZonedDateTime createdAt;
    @Column(columnDefinition = "TIMESTAMP", nullable = false)
    private ZonedDateTime updatedAt;
    private Set<String> likes = new HashSet<>();
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
