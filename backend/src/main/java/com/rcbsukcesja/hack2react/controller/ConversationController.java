package com.rcbsukcesja.hack2react.controller;

import com.rcbsukcesja.hack2react.model.dto.ConversationDto;
import com.rcbsukcesja.hack2react.model.dto.MessageDto;
import com.rcbsukcesja.hack2react.service.ConversationService;
import com.rcbsukcesja.hack2react.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/conversations")
public class ConversationController {

    private final ConversationService conversationService;


    @GetMapping("/{id}")
    public ResponseEntity<?> getConversationByUserId(@PathVariable("id") UUID id) {
        return new ResponseEntity<>(
                conversationService.getConversationByUserId(id), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<?> createConversation(@RequestBody ConversationDto conversationDto) {
        return new ResponseEntity<>(conversationService.createConversation(conversationDto)
                , HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteConversation(@PathVariable("id") UUID id) {
        conversationService.deleteConversation(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
