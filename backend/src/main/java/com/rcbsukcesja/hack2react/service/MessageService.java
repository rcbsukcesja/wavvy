package com.rcbsukcesja.hack2react.service;

import com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages;
import com.rcbsukcesja.hack2react.exceptions.notFound.MessageNotFoundException;
import com.rcbsukcesja.hack2react.model.dto.save.MessageDto;
import com.rcbsukcesja.hack2react.model.dto.view.MessageView;
import com.rcbsukcesja.hack2react.model.entity.Message;
import com.rcbsukcesja.hack2react.model.entity.User;
import com.rcbsukcesja.hack2react.model.mappers.MessageMapper;
import com.rcbsukcesja.hack2react.repositories.MessageRepository;
import com.rcbsukcesja.hack2react.utils.TimeUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final MessageMapper messageMapper;
    private final ConversationService conversationService;
    private final UserService userService;

    public MessageView getMessageById(UUID id) {
        return messageMapper.messageToMessageView(getMessageOrThrowException(id));
    }

    @Transactional
    public MessageView createMessage(MessageDto messageDto) {
        Message message = messageMapper.messageDtoToMessage(messageDto);
        User fromUser = userService.getUserByIdOrThrowException(messageDto.fromUserId());
        User toUser = userService.getUserByIdOrThrowException(messageDto.toUserId());
        message.setFromUser(fromUser);
        message.setToUser(toUser);
        message.setConversation(conversationService
                .getConversationByIdOrThrowException(messageDto.conversationId()));
        message.setCreatedAt(TimeUtils.now());
        Message saved = messageRepository.save(message);
        return messageMapper.messageToMessageView(saved);

    }

    @Transactional
    public MessageView updateMessage(UUID messageId, MessageDto messageDto) {
        Message actual = getMessageOrThrowException(messageId);
        actual.setConversation(conversationService
                .getConversationByIdOrThrowException(messageDto.conversationId()));
        actual.setText(messageDto.text());

        Message saved = messageRepository.save(actual);
        return messageMapper.messageToMessageView(saved);
    }

    @Transactional
    public void deleteMessage(UUID id) {
        Message message = getMessageOrThrowException(id);
        messageRepository.delete(message);
    }

    public Message getMessageOrThrowException(UUID id) {
        return messageRepository.getMessageById(id)
                .orElseThrow(() -> new MessageNotFoundException(ErrorMessages.MESSAGE_NOT_FOUND, id));
    }

}
