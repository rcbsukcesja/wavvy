package com.rcbsukcesja.hack2react.service;

import com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages;
import com.rcbsukcesja.hack2react.exceptions.notFound.MessageNotFoundException;
import com.rcbsukcesja.hack2react.model.dto.save.MessageDto;
import com.rcbsukcesja.hack2react.model.dto.view.MessageView;
import com.rcbsukcesja.hack2react.model.entity.Message;
import com.rcbsukcesja.hack2react.model.entity.User;
import com.rcbsukcesja.hack2react.model.mappers.MessageMapper;
import com.rcbsukcesja.hack2react.notificator.mail.MessageManager;
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
    private final UserService userService;
    private final MessageManager messageManager;

    @Transactional
    public MessageView createMessage(MessageDto messageDto) {
        Message message = messageMapper.messageDtoToMessage(messageDto);
        User fromUser = userService.getUserByIdOrThrowException(messageDto.fromUserId());
        User toUser = userService.getUserByIdOrThrowException(messageDto.toUserId());
        message.setFromUser(fromUser);
        message.setToUser(toUser);
        message.setCreatedAt(TimeUtils.nowInUTC());
        Message saved = messageRepository.save(message);
        messageManager.sendMessageToUser(message);
        return messageMapper.messageToMessageView(saved);

    }
}
