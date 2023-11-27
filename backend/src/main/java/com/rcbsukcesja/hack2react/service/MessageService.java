package com.rcbsukcesja.hack2react.service;

import com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages;
import com.rcbsukcesja.hack2react.exceptions.notFound.MessageNotFoundException;
import com.rcbsukcesja.hack2react.model.dto.save.MessagePathDto;
import com.rcbsukcesja.hack2react.model.dto.save.MessageSaveDto;
import com.rcbsukcesja.hack2react.model.dto.view.MessageView;
import com.rcbsukcesja.hack2react.model.entity.Message;
import com.rcbsukcesja.hack2react.model.entity.User;
import com.rcbsukcesja.hack2react.model.enums.UserType;
import com.rcbsukcesja.hack2react.model.mappers.MessageMapper;
import com.rcbsukcesja.hack2react.repositories.MessageRepository;
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

    private final String UMK = "Urząd Miasta Kołobrzeg";

    @Transactional
    public MessageView createMessage(MessageSaveDto messageSaveDto) {

        Message message = new Message();
        setBasicMessageFields(message, messageSaveDto);

        User senders = getLogedUser();
        message.setSender(senders);
        User receiver = userService.getUserByIdOrThrowException(messageSaveDto.receiverId());
        message.setReceiver(receiver);
        message.setCreatedAt(TimeUtils.nowInUTC());
        message.setName(createName(senders, messageSaveDto.name()));

        messageRepository.save(message);
        return messageMapper.messageToMessageView(message);
    }

    private String createName(User user, String tempName) {

        StringBuilder sB = new StringBuilder();

        if (user.getUserType().equals(UserType.CITY_HALL)) {
            sB.append(tempName).append(" ").append(UMK);
        } else {
            sB.append(tempName).append(" ").append(user.getOrganization().getName());
        }
        return sB.toString();
    }


    private void setBasicMessageFields(Message message, MessageSaveDto messageSaveDto) {
        message.setMessage(messageSaveDto.message());
        message.setTitle(messageSaveDto.title());
        message.setContact(messageSaveDto.contact());
    }

    public MessageView patchUpdateMessage(UUID messageId, MessagePathDto dto) {

        Message actual = getMessageOrThrowException(messageId);

        if (dto.contact() != null && !actual.getContact().equals(dto.contact())) {
            actual.setContact(dto.contact());
        }
        if (dto.message() != null && !actual.getMessage().equals(dto.message())) {
            actual.setMessage(dto.message());
        }
        if (dto.contact() != null && !actual.getName().equals(dto.name())) {
            actual.setMessage(dto.message());
        }
        if (dto.name() != null && !actual.getName().equals(dto.name().split(" ")[0])) {
            actual.setName(createName(actual.getSender(), dto.name()));
        }
        return messageMapper.messageToMessageView(actual);
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

    private Message getMessageOrThrowException(UUID id) {
        return messageRepository.getMessageById(id).orElseThrow(() -> new MessageNotFoundException(ErrorMessages.MESSAGE_NOT_FOUND, id));
    }

    private User getLogedUser() {
        UUID userId = TokenUtils.getUserId(SecurityContextHolder.getContext().getAuthentication());
        return userService.getUserByIdOrThrowException(userId);
    }


}
