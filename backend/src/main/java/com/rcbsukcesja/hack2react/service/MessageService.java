package com.rcbsukcesja.hack2react.service;

import com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages;
import com.rcbsukcesja.hack2react.exceptions.notFound.MessageNotFoundException;
import com.rcbsukcesja.hack2react.exceptions.notFound.OrganizationNotFoundException;
import com.rcbsukcesja.hack2react.model.dto.save.MessageByCitySaveDto;
import com.rcbsukcesja.hack2react.model.dto.save.MessageByOrganizationsSaveDto;
import com.rcbsukcesja.hack2react.model.dto.save.MessagePatchDto;
import com.rcbsukcesja.hack2react.model.dto.save.MessageSaveDto;
import com.rcbsukcesja.hack2react.model.dto.view.MessageView;
import com.rcbsukcesja.hack2react.model.entity.Message;
import com.rcbsukcesja.hack2react.model.entity.Organization;
import com.rcbsukcesja.hack2react.model.entity.User;
import com.rcbsukcesja.hack2react.model.enums.UserType;
import com.rcbsukcesja.hack2react.model.mappers.MessageMapper;
import com.rcbsukcesja.hack2react.repositories.MessageRepository;
import com.rcbsukcesja.hack2react.repositories.OrganizationRepository;
import com.rcbsukcesja.hack2react.repositories.UserRepository;
import com.rcbsukcesja.hack2react.utils.TimeUtils;
import com.rcbsukcesja.hack2react.utils.TokenUtils;
import com.rcbsukcesja.hack2react.validations.UserValidation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class MessageService {

    private final MessageRepository messageRepository;
    private final MessageMapper messageMapper;
    private final UserService userService;
    private final UserValidation userValidation;
    private final OrganizationRepository organizationRepository;

    private final UserRepository userRepository;

    private static final String CITY_NAME_ADDITION = "Urząd Miasta Kołobrzeg";

    @Transactional
    public MessageView createMessage(MessageSaveDto messageSaveDto) {
        log.info("createMessage(messageSaveDto: {})", messageSaveDto);

        Message message = new Message();
        setBasicMessageFields(message, messageSaveDto);

        User sender = getLoggedUser();
        message.setSender(sender);
        User receiver = userService.getUserByIdOrThrowException(messageSaveDto.receiverId());
        message.setReceiver(receiver);
        message.setCreatedAt(TimeUtils.nowInUTC());
        message.setUpdatedAt(message.getCreatedAt());
        message.setName(createName(sender, messageSaveDto.name()));

        messageRepository.save(message);
        return messageMapper.messageToMessageView(message);
    }

    @Transactional
    public MessageView createMessageByOrganizations(MessageByOrganizationsSaveDto messageSaveDto) {
        log.info("createMessageByOrganizations(messageSaveDto: {})", messageSaveDto);

        Message message = new Message();
        message.setMessage(messageSaveDto.message());
        message.setTitle(messageSaveDto.title());
        message.setContact(messageSaveDto.contact());

        User sender = getLoggedUser();
        message.setSender(sender);
        User receiver = getOrganizationByIdOrThrowException(messageSaveDto.organizationId()).getOwner();
        message.setReceiver(receiver);
        message.setCreatedAt(TimeUtils.nowInUTC());
        message.setUpdatedAt(message.getCreatedAt());
        message.setName(createName(sender, messageSaveDto.name()));

        messageRepository.save(message);
        return messageMapper.messageToMessageView(message);
    }

    @Transactional
    public MessageView createMessageByCity(MessageByCitySaveDto messageSaveDto) {
        log.info("createMessageByCity(messageSaveDto: {})", messageSaveDto);
        List<User> receivers = findUserCity();
        Message message = new Message();
        for(User receiver : receivers) {

            message.setMessage(messageSaveDto.message());
            message.setTitle(messageSaveDto.title());
            message.setContact(messageSaveDto.contact());

            User sender = getLoggedUser();
            message.setSender(sender);

            message.setReceiver(receiver);
            message.setCreatedAt(TimeUtils.nowInUTC());
            message.setUpdatedAt(message.getCreatedAt());
            message.setName(createName(sender, messageSaveDto.name()));

            messageRepository.save(message);
        }
        return messageMapper.messageToMessageView(message);
    }

    @Transactional
    public MessageView patchUpdateMessage(UUID messageId, MessagePatchDto dto) {
        log.info("patchUpdateMessage(messageId: {}, dto: {})", messageId, dto);

        Message actual = getMessageOrThrowException(messageId);

        userValidation.checkIfIsOwner(actual.getSender().getId());

        if (dto.contact() != null && !actual.getContact().equals(dto.contact())) {
            actual.setContact(dto.contact());
        }
        if (dto.message() != null && !actual.getMessage().equals(dto.message())) {
            actual.setMessage(dto.message());
        }
        if (dto.contact() != null && !actual.getName().equals(dto.name())) {
            actual.setMessage(dto.message());
        }
        if (dto.name() != null) {
            actual.setName(createName(actual.getSender(), dto.name()));
        }
        actual.setUpdatedAt(TimeUtils.nowInUTC());
        Message updated = messageRepository.save(actual);

        return messageMapper.messageToMessageView(updated);
    }

    public void deleteMessage(UUID id) {
        log.info("deleteMessage(id: {})", id);
        Message message = getMessageOrThrowException(id);
        userValidation.checkIfIsOwner(message.getSender().getId());
        messageRepository.delete(message);
    }

    public List<MessageView> getSentMessages() {
        log.info("getSentMessage()");
        List<Message> messages = messageRepository.getMessageBySender(getLoggedUser());
        return messageMapper.messageListToMessageViewList(messages);
    }

    public List<MessageView> getReceivedMessages() {
        log.info("getReceivedMessages()");
        List<Message> messages = messageRepository.getMessageByReceiver(getLoggedUser());
        return messageMapper.messageListToMessageViewList(messages);
    }

    private Message getMessageOrThrowException(UUID id) {
        return messageRepository.getMessageById(id).orElseThrow(() -> new MessageNotFoundException(ErrorMessages.MESSAGE_NOT_FOUND, id));
    }

    private User getLoggedUser() {
        return userService.getUserByIdOrThrowException(TokenUtils
                .getUserId(SecurityContextHolder.getContext()
                        .getAuthentication()));
    }

    private void setBasicMessageFields(Message message, MessageSaveDto messageSaveDto) {
        message.setMessage(messageSaveDto.message());
        message.setTitle(messageSaveDto.title());
        message.setContact(messageSaveDto.contact());
    }

    private String createName(User user, String tempName) {

        StringBuilder sB = new StringBuilder();

        if (user.getUserType().equals(UserType.CITY_HALL)) {
            sB.append(tempName).append(" ").append(CITY_NAME_ADDITION);
        } else {
            sB.append(tempName).append(" ").append(user.getOrganization().getName());
        }
        return sB.toString();
    }

    private Organization getOrganizationByIdOrThrowException(UUID id) {
        return organizationRepository.findById(id)
                .orElseThrow(() -> new OrganizationNotFoundException(
                        ErrorMessages.ORGANIZATION_NOT_FOUND, id));
    }

    private List<User> findUserCity(){
        return userRepository.getUserByUserType(UserType.CITY_HALL);
    }


}
