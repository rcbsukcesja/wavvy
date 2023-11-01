package com.rcbsukcesja.hack2react.model.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Embeddable
public class Address {
    private String street;
    private String houseNumber;
    private String apartmentNumber;
    private String city;
    private String zipCode;
    private String country;
}
