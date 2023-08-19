package com.rcbsukcesja.hack2react.model.dto.view;

import com.rcbsukcesja.hack2react.model.enums.UserType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class UserView {

    private UUID id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private boolean deleted;
    private UserType userType;
}
