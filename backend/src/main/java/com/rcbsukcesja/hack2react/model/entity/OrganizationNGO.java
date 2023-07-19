package com.rcbsukcesja.hack2react.model.entity;

import com.rcbsukcesja.hack2react.model.enums.LegalStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "ORGANIZATIONS_NGOS")
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class OrganizationNGO extends Organization {


    @Enumerated(EnumType.STRING)
    private LegalStatus legalStatus;

    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "organizationsNGO_projects",
            joinColumns = {@JoinColumn(name = "organizationNGO_id")},
            inverseJoinColumns = {@JoinColumn(name = "project_id")}
    )
    private List<Project> projects;
    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "organizationsNGO_donors",
            joinColumns = {@JoinColumn(name = "organizationNGO_id")},
            inverseJoinColumns = {@JoinColumn(name = "company_id")}
    )
    private List<Company> donors;
    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "organizationsNGO_employees",
            joinColumns = {@JoinColumn(name = "organizationNGO_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")}
    )
    private List<User> employees;


    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode());
    }
}
