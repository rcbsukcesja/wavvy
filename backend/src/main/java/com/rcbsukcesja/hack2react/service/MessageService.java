package com.rcbsukcesja.hack2react.service;

import com.rcbsukcesja.hack2react.model.dto.MessageDto;
import com.rcbsukcesja.hack2react.model.entity.Message;
import com.rcbsukcesja.hack2react.model.mappers.MessageMapper;
import com.rcbsukcesja.hack2react.repositories.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final MessageMapper messageMapper;


    public MessageDto getMessageById(UUID id) {
        return messageMapper.messageToMessageDto(messageRepository.getMessageById(id));
    }

    @Transactional
    public Message createMessage(MessageDto messageDto) {
        Message message = messageMapper.messageDtoToMessage(messageDto);
        Message saved = messageRepository.save(message);
        return saved;
    }

    @Transactional
    public void deleteMessage(UUID id) {
        Message message = messageRepository.getMessageById(id);
        messageRepository.delete(message);
    }
}
