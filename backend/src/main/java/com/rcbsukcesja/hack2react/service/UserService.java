package com.rcbsukcesja.hack2react.service;

import com.rcbsukcesja.hack2react.model.dto.UserDto;
import com.rcbsukcesja.hack2react.model.entity.User;
import com.rcbsukcesja.hack2react.model.mappers.UserMapper;
import com.rcbsukcesja.hack2react.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public List<UserDto> getAllUsers() {
        return userMapper.listUserToListUserDto(userRepository.findAll());
    }

    public UserDto getUserById(UUID id) {
        return userMapper.userToUserDto(userRepository.getUserById(id));
    }

    @Transactional
    public UUID createUser(UserDto userDto) {
        User user = userMapper.userDtoToUser(userDto);
        User saved = userRepository.save(user);
        return saved.getId();
    }

    @Transactional
    public void deleteUser(UUID id){
        User user = userRepository.getUserById(id);
        userRepository.delete(user);
    }
}
