package com.rcbsukcesja.hack2react.controller;

import com.rcbsukcesja.hack2react.model.dto.save.MessageByCitySaveDto;
import com.rcbsukcesja.hack2react.model.dto.save.MessageByOrganizationsSaveDto;
import com.rcbsukcesja.hack2react.model.dto.save.MessagePatchDto;
import com.rcbsukcesja.hack2react.model.dto.save.MessageSaveDto;
import com.rcbsukcesja.hack2react.model.dto.view.MessageView;
import com.rcbsukcesja.hack2react.service.MessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/messages")
public class MessageController {

    private final MessageService messageService;

    @PostMapping
    public ResponseEntity<MessageView> createMessage(@RequestBody MessageSaveDto messageSaveDto) {
        return new ResponseEntity<>(messageService.createMessage(messageSaveDto), HttpStatus.CREATED);
    }

    @PostMapping("/organizations")
    public ResponseEntity<MessageView> createMessageByOrganizations(@RequestBody MessageByOrganizationsSaveDto messageSaveDto) {
        return new ResponseEntity<>(messageService.createMessageByOrganizations(messageSaveDto), HttpStatus.CREATED);
    }

    @PostMapping("/city")
    public ResponseEntity<MessageView> createMessageByCity(@RequestBody MessageByCitySaveDto messageSaveDto) {
        return new ResponseEntity<>(messageService.createMessageByCity(messageSaveDto), HttpStatus.CREATED);
    }

    @PatchMapping("/{messageId}")
    public ResponseEntity<MessageView> patchUpdateMessage(
            @PathVariable UUID messageId,
            @RequestBody @Valid MessagePatchDto dto) {
        return new ResponseEntity<>(messageService.patchUpdateMessage(messageId, dto), HttpStatus.OK);
    }

    @GetMapping("/sent")
    public ResponseEntity<List<MessageView>> getSentMessages() {
        return new ResponseEntity<>(
                messageService.getSentMessages(), HttpStatus.OK);
    }

    @GetMapping("/received")
    public ResponseEntity<List<MessageView>> getReceivedMessages() {
        return new ResponseEntity<>(
                messageService.getReceivedMessages(), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMessage(@PathVariable("id") UUID id) {
        messageService.deleteMessage(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
