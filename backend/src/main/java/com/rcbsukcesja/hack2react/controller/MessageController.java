package com.rcbsukcesja.hack2react.controller;

import com.rcbsukcesja.hack2react.model.dto.save.MessageDto;
import com.rcbsukcesja.hack2react.model.dto.view.MessageView;
import com.rcbsukcesja.hack2react.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/messages")
public class MessageController {

    private final MessageService messageService;


    @GetMapping("/{id}")
    public ResponseEntity<MessageView> getMessageById(@PathVariable("id") UUID id) {
        return new ResponseEntity<>(
                messageService.getMessageById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<MessageView> createMessage(@RequestBody MessageDto messageDto) {
        return new ResponseEntity<>(messageService.createMessage(messageDto)
                , HttpStatus.CREATED);
    }

    @PutMapping("/{messageId}")
    public ResponseEntity<MessageView> updateMessage(
            @PathVariable UUID messageId,
            @RequestBody MessageDto messageDto) {
        return new ResponseEntity<>(
                messageService.updateMessage(messageId, messageDto), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMessage(@PathVariable("id") UUID id) {
        messageService.deleteMessage(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
