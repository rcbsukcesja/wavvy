package com.rcbsukcesja.hack2react.model.dto.view;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class AddressView {
    private String street;
    private String city;
    private String zipCode;
    private String country;
}
