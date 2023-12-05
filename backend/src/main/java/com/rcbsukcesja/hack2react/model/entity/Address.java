package com.rcbsukcesja.hack2react.model.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Embeddable
@ToString
public class Address {
    private String street;
    private String city;
    private String zipCode;
    private String country;
}
