package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.UserDto;
import com.rcbsukcesja.hack2react.model.entity.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User userDtoToUser(UserDto userDto);

    UserDto userToUserDto(User user);

    List<UserDto> listUserToListUserDto(List<User> users);

    List<User> listUserDtoToListUser(List<UserDto> userDtos);

}
