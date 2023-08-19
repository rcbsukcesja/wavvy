package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.view.UserLightweightView;
import com.rcbsukcesja.hack2react.model.entity.User;
import org.mapstruct.Mapper;

import java.util.Set;

@Mapper(componentModel = "spring")
public interface UserLightweightMapper {

    UserLightweightView userToUserLightweightView(User user);

    Set<UserLightweightView> userSetToUserLightweightViewSet(Set<User> userSet);

}
