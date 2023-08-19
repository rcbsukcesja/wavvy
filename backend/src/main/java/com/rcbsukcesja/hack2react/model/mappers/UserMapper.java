package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.save.UserDto;
import com.rcbsukcesja.hack2react.model.dto.view.UserView;
import com.rcbsukcesja.hack2react.model.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User userViewToUser(UserView userView);

    UserView userToUserView(User user);

    List<UserView> listUserToListUserView(List<User> users);

    List<User> listUserViewToListUser(List<UserView> userViews);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    User userDtoToUser(UserDto userDto);

}
