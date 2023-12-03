package com.rcbsukcesja.hack2react.controller;

import com.rcbsukcesja.hack2react.model.dto.save.UserPatchDto;
import com.rcbsukcesja.hack2react.model.dto.save.UserSaveDto;
import com.rcbsukcesja.hack2react.model.dto.view.UserView;
import com.rcbsukcesja.hack2react.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;


    @GetMapping
    @PreAuthorize("hasRole('ROLE_CITY_HALL')")
    public ResponseEntity<List<UserView>> getAllUsers() {
        return new ResponseEntity<>(
                userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_CITY_HALL')")
    public ResponseEntity<UserView> getUserById(@PathVariable("id") UUID id) {
        return new ResponseEntity<>(
                userService.getUserById(id), HttpStatus.OK);
    }

    //TODO: dodać /my -> ep zwraca dane zalogowanego użytkownika

    // This endpoint has been disabled because it is not used anymore
    //@PostMapping
    public ResponseEntity<UserView> createUser(@RequestBody @Valid UserSaveDto userSaveDto) {
        UserView result = userService.saveUser(null, userSaveDto);
        return new ResponseEntity<>(
                result, HttpStatus.CREATED);
    }

    // This endpoint has been disabled because it is not used anymore
    //@PutMapping("/{userId}")
    public ResponseEntity<UserView> putUpdateUser(@PathVariable UUID userId, @RequestBody @Valid UserSaveDto userSaveDto) {
        UserView result = userService.saveUser(userId, userSaveDto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    //TODO: tylko użytkownik, którego to dotyczy mogą zmieniać dane
    @PatchMapping("/{userId}")
    @PreAuthorize("hasAnyRole('ROLE_NGO','ROLE_COMPANY')")
    public ResponseEntity<UserView> patchUpdateUser(@PathVariable UUID userId, @RequestBody @Valid UserPatchDto userPatchDto) {
        UserView result = userService.updateUser(userId, userPatchDto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_CITY_HALL')")
    public ResponseEntity<UserView> deleteUser(@PathVariable("id") UUID id) {
        return new ResponseEntity<>(userService.deleteUser(id), HttpStatus.OK);
    }


}
