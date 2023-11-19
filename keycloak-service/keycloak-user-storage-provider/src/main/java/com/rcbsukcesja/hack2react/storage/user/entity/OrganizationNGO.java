package com.rcbsukcesja.hack2react.storage.user.entity;

import com.rcbsukcesja.hack2react.storage.user.enums.LegalStatus;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@DiscriminatorValue("NGO")
public class OrganizationNGO extends Organization {

    @Enumerated(EnumType.STRING)
    @Column(name = "LEGAL_STATUS")
    private LegalStatus legalStatus;

}
