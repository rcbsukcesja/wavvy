package com.rcbsukcesja.hack2react.repositories;

import com.rcbsukcesja.hack2react.model.entity.User;
import com.rcbsukcesja.hack2react.model.enums.UserType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> getUserById(UUID id);

    Boolean existsByEmailIgnoreCase(String email);


    Boolean existsByUsernameIgnoreCase(String username);

    List<User> getUserByUserType(UserType cityHall);
}
