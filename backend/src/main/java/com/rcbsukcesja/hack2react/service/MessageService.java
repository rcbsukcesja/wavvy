package com.rcbsukcesja.hack2react.service;

import com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages;
import com.rcbsukcesja.hack2react.exceptions.notFound.MessageNotFoundException;
import com.rcbsukcesja.hack2react.model.dto.save.MessageDto;
import com.rcbsukcesja.hack2react.model.dto.view.MessageView;
import com.rcbsukcesja.hack2react.model.entity.Message;
import com.rcbsukcesja.hack2react.model.entity.User;
import com.rcbsukcesja.hack2react.model.enums.UserType;
import com.rcbsukcesja.hack2react.model.mappers.MessageMapper;
import com.rcbsukcesja.hack2react.repositories.MessageRepository;
import com.rcbsukcesja.hack2react.repositories.UserRepository;
import com.rcbsukcesja.hack2react.utils.TimeUtils;
import com.rcbsukcesja.hack2react.utils.TokenUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final MessageMapper messageMapper;
    private final UserService userService;
    private final UserRepository userRepository;

    @Transactional
    public MessageView createMessage(MessageDto messageDto) {

        Message message = new Message();
        setBasicMessageFields(message, messageDto);

        User senders = getLogedUser();
        message.setSender(senders);
        User receiver = userService.getUserByIdOrThrowException(messageDto.receiverId());
        message.setReceiver(receiver);
        message.setCreatedAt(TimeUtils.nowInUTC());

        if (senders.getUserType().equals(UserType.CITY_HALL)) {
            message.setName("urząd miasta kołobrzeg " + messageDto.name());
        } else if (senders.getUserType().equals(UserType.BUSINESS)) {
            message.setName(senders.getOrganization().getName() + " " + messageDto.name());
        } else if (senders.getUserType().equals(UserType.NGO)) {
            message.setName(senders.getOrganization().getName() + " " + messageDto.name());
        }
        messageRepository.save(message);

        return messageMapper.messageToMessageView(message);
    }


    private void setBasicMessageFields(Message message, MessageDto messageDto) {
        message.setMessage(messageDto.message());
        message.setTitle(messageDto.title());
        message.setContact(messageDto.contact());
    }

    public void deleteMessage(UUID id) {
        Message message = getMessageOrThrowException(id);
        messageRepository.delete(message);
    }

    public List<MessageView> getSendMessages() {
        User sender = getLogedUser();
        List<Message> messages = messageRepository.getMessageBySender(sender);
        return messageMapper.messageListToMessageViewList(messages);
    }

    public List<MessageView> getReceivedMessages() {
        User receiver = getLogedUser();
        List<Message> messages = messageRepository.getMessageByReceiver(receiver);
        return messageMapper.messageListToMessageViewList(messages);
    }

    public Message getMessageOrThrowException(UUID id) {
        return messageRepository.getMessageById(id)
                .orElseThrow(() -> new MessageNotFoundException(ErrorMessages.MESSAGE_NOT_FOUND, id));
    }

    private User getLogedUser() {
        UUID userId = TokenUtils.getUserId(SecurityContextHolder.getContext().getAuthentication());
        return userService.getUserByIdOrThrowException(userId);
    }

}
