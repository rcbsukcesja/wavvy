package com.rcbsukcesja.hack2react.controller;

import com.rcbsukcesja.hack2react.model.dto.save.ConversationDto;
import com.rcbsukcesja.hack2react.model.dto.view.ConversationView;
import com.rcbsukcesja.hack2react.service.ConversationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/conversations")
public class ConversationController {

    private final ConversationService conversationService;


    @GetMapping("/{userId}")
    public ResponseEntity<List<ConversationView>> getConversationByUserId(@PathVariable UUID userId) {
        return new ResponseEntity<>(conversationService.getConversationByUserId(userId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ConversationView> createConversation(@RequestBody ConversationDto conversationDto) {
        return new ResponseEntity<>(conversationService.createConversation(conversationDto), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteConversation(@PathVariable("id") UUID id) {
        conversationService.deleteConversation(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
