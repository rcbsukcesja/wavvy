package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.view.UserView;
import com.rcbsukcesja.hack2react.model.entity.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserView userToUserView(User user);

    List<UserView> listUserToListUserView(List<User> users);

}
