package com.rcbsukcesja.hack2react.service;

import com.rcbsukcesja.hack2react.exceptions.alreadyExists.EmailAlreadyExistsException;
import com.rcbsukcesja.hack2react.exceptions.alreadyExists.UsernameAlreadyExistsException;
import com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages;
import com.rcbsukcesja.hack2react.exceptions.notFound.UserNotFoundException;
import com.rcbsukcesja.hack2react.model.dto.save.UserPatchDto;
import com.rcbsukcesja.hack2react.model.dto.save.UserSaveDto;
import com.rcbsukcesja.hack2react.model.dto.view.UserView;
import com.rcbsukcesja.hack2react.model.entity.User;
import com.rcbsukcesja.hack2react.model.mappers.UserMapper;
import com.rcbsukcesja.hack2react.notificator.mail.MessageManager;
import com.rcbsukcesja.hack2react.repositories.UserRepository;
import com.rcbsukcesja.hack2react.utils.TokenUtils;
import com.rcbsukcesja.hack2react.validations.UserValidation;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final MessageManager messageManager;
    private final UserValidation userValidation;

    public List<UserView> getAllUsers() {
        return userMapper.listUserToListUserView(userRepository.findAll());
    }

    public UserView getUserById(UUID userId) {
        User user = getUserByIdOrThrowException(userId);
        return userMapper.userToUserView(user);
    }

    public UserView getLoggedUser() {
        UUID userId = TokenUtils.getUserId(SecurityContextHolder.getContext().getAuthentication());
        User user = getUserByIdOrThrowException(userId);
        return userMapper.userToUserView(user);
    }

    @Transactional
    public UserView saveUser(UUID userId, UserSaveDto dto) {
        User user;
        if (userId == null) {
            checkUserEmail(dto.email());
            checkUsername(dto.username());
            user = User.builder()
                    .username(dto.username())
                    .firstName(dto.firstName())
                    .lastName(dto.lastName())
                    .email(dto.email())
                    .userType(dto.userType())
                    .deleted(false)
                    .build();
        } else {
            user = getUserByIdOrThrowException(userId);
            if (!user.getUsername().equalsIgnoreCase(dto.username())) {
                checkUsername(dto.username());
            }
            if (!user.getEmail().equalsIgnoreCase(dto.email())) {
                checkUserEmail(dto.email());
            }
            user.setUsername(dto.username());
            user.setFirstName(dto.firstName());
            user.setLastName(dto.lastName());
            user.setEmail(dto.email());
            user.setUserType(dto.userType());

        }
        User saved = userRepository.save(user);
        messageManager.sendWelcomeMessage(saved.getEmail());
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
    public UserView updateUser(UUID userId, UserPatchDto dto) {
        User user = getUserByIdOrThrowException(userId);
        userValidation.checkIfIsOwner(userId);
        if (dto.username() != null && !user.getUsername().equalsIgnoreCase(dto.username())) {
            checkUsername(dto.username());
        }
        if (dto.firstName() != null && !user.getFirstName().equals(dto.firstName())) {
            user.setFirstName(dto.firstName());
        }
        if (dto.lastName() != null && !user.getLastName().equals(dto.lastName())) {
            user.setLastName(dto.lastName());
        }
        if (dto.userType() != null && !user.getUserType().equals(dto.userType())) {
            user.setUserType(dto.userType());
        }
        User saved = userRepository.save(user);
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
