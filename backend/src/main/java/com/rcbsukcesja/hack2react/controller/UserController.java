package com.rcbsukcesja.hack2react.controller;

import com.rcbsukcesja.hack2react.model.dto.save.UserPatchDto;
import com.rcbsukcesja.hack2react.model.dto.save.UserSaveDto;
import com.rcbsukcesja.hack2react.model.dto.view.UserView;
import com.rcbsukcesja.hack2react.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    public ResponseEntity<List<UserView>> getAllUsers() {
        return new ResponseEntity<>(
                userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserView> getUserById(@PathVariable("id") UUID id) {
        return new ResponseEntity<>(
                userService.getUserById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<UserView> createUser(@RequestBody @Valid UserSaveDto userSaveDto) {
        UserView result = userService.saveUser(null, userSaveDto);
        return new ResponseEntity<>(
                result, HttpStatus.CREATED);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserView> putUpdateUser(@PathVariable UUID userId, @RequestBody @Valid UserSaveDto userSaveDto) {
        UserView result = userService.saveUser(userId, userSaveDto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PatchMapping("/{userId}")
    public ResponseEntity<UserView> patchUpdateUser(@PathVariable UUID userId, @RequestBody @Valid UserPatchDto userPatchDto) {
        UserView result = userService.updateUser(userId, userPatchDto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<UserView> deleteUser(@PathVariable("id") UUID id) {
        return new ResponseEntity<>(userService.deleteUser(id), HttpStatus.OK);
    }


}
