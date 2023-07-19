package com.rcbsukcesja.hack2react.controller;

import com.rcbsukcesja.hack2react.model.dto.MessageDto;
import com.rcbsukcesja.hack2react.model.dto.OfferDto;
import com.rcbsukcesja.hack2react.service.MessageService;
import com.rcbsukcesja.hack2react.service.OfferService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/messages")
public class MessageController {

    private final MessageService messageService;


    @GetMapping("/{id}")
    public ResponseEntity<?> getMessageById(@PathVariable("id") UUID id) {
        return new ResponseEntity<>(
                messageService.getMessageById(id), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<?> createMessage(@RequestBody MessageDto messageDto) {
        return new ResponseEntity<>(messageService.createMessage(messageDto)
                , HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMessage(@PathVariable("id") UUID id) {
        messageService.deleteMessage(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
