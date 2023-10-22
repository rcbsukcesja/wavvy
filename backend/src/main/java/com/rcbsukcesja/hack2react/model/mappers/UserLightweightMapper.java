package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.view.UserLightweightView;
import com.rcbsukcesja.hack2react.model.entity.User;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.Set;

@Mapper(componentModel = "spring")
public interface UserLightweightMapper {

    @Mapping(target = "displayName", ignore = true)
    UserLightweightView userToUserLightweightView(User user);

    Set<UserLightweightView> userSetToUserLightweightViewSet(Set<User> userSet);

    @AfterMapping
    default void setDisplayName(User user, @MappingTarget UserLightweightView userLightweightView) {
        userLightweightView.setDisplayName(user.getFirstName() + " " + user.getLastName());
    }
}
