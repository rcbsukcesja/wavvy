package com.rcbsukcesja.hack2react.service;

import com.rcbsukcesja.hack2react.exceptions.alreadyExists.EmailAlreadyExistsException;
import com.rcbsukcesja.hack2react.exceptions.alreadyExists.UsernameAlreadyExistsException;
import com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages;
import com.rcbsukcesja.hack2react.exceptions.notFound.UserNotFoundException;
import com.rcbsukcesja.hack2react.model.dto.save.UserDto;
import com.rcbsukcesja.hack2react.model.dto.view.UserView;
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

    private final UserMapper userMapper;
    private final UserRepository userRepository;

    public List<UserView> getAllUsers() {

        return userMapper.listUserToListUserView(userRepository.findAll());
    }

    public UserView getUserById(UUID userId) {

        User user = getUserByIdOrThrowException(userId);

        return userMapper.userToUserView(user);
    }

    @Transactional
    public UserView createUser(UserDto userDto) {

        checkUserEmail(userDto.email());
        checkUsername(userDto.username());

        User user = userMapper.userDtoToUser(userDto);
        user.setDeleted(false);
        User saved = userRepository.save(user);
        return userMapper.userToUserView(saved);
    }

    @Transactional
    public UserView deleteUser(UUID id) {
        User user = getUserByIdOrThrowException(id);
        user.setDeleted(true);
        user.setEmail(null);
        User saved = userRepository.save(user);
        return userMapper.userToUserView(saved);
    }

    @Transactional
    public UserView updateUser(UUID userId, UserDto userDto) {
        User actual = getUserByIdOrThrowException(userId);
        if (!actual.getUsername().equalsIgnoreCase(userDto.username())) {
            checkUsername(userDto.username());
        }
        if (!actual.getEmail().equalsIgnoreCase(userDto.email())) {
            checkUserEmail(userDto.email());
        }
        User updated = userMapper.userDtoToUser(userDto);
        updated.setId(userId);
        updated.setDeleted(actual.isDeleted());
        User saved = userRepository.save(updated);
        return userMapper.userToUserView(saved);
    }


    private void checkUserEmail(String email) {
        if (userRepository.existsByEmailIgnoreCase(email)) {
            throw new EmailAlreadyExistsException(
                    ErrorMessages.USERS_EMAIL_ALREADY_EXIST, email);
        }
    }

    private void checkUsername(String username) {
        if (userRepository.existsByUsernameIgnoreCase(username)) {
            throw new UsernameAlreadyExistsException(ErrorMessages.USERS_USERNAME_ALREADY_EXIST, username);
        }
    }

    public User getUserByIdOrThrowException(UUID id) {
        return userRepository.getUserById(id)
                .orElseThrow(() -> new UserNotFoundException(ErrorMessages.USER_NOT_FOUND, id));
    }
}
