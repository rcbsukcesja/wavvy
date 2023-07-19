package com.rcbsukcesja.hack2react.model.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.rcbsukcesja.hack2react.model.enums.UserType;
import lombok.*;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class UserDto {

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private UUID id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private UserType userType;
}
