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
    private  final UserRepository userRepository;

    @Transactional
    public MessageView createMessage(MessageDto messageDto) {

        Message message = new Message();
        setBasicMessageFields(message, messageDto);

        User senders = getLogedUser();
        message.setSender(senders);
        User receiver = userRepository.getReferenceById(messageDto.receiverId());
        message.setReceiver(receiver);
        message.setCreatedAt(TimeUtils.nowInUTC());

        if (senders.getUserType().equals(UserType.CITY_HALL)){
            message.setName("urząd miasta kołobrzeg "+ messageDto.name());
        }else if(senders.getUserType().equals(UserType.BUSINESS)){
            message.setName(senders.getOrganization().getName()+" "+messageDto.name());
        }else if (senders.getUserType().equals(UserType.NGO)){
            message.setName(senders.getOrganization().getName()+ " "+messageDto.name());
        }
        messageRepository.save(message);

        return messageMapper.messageToMessageView(message);
    }


    private void setBasicMessageFields(Message message, MessageDto messageDto){
        message.setMessage(message.getMessage());
        message.setTitle(message.getTitle());
        message.setContact(message.getContact());
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

//    public MessageView getMessageById(UUID id) {
//        return messageMapper.messageToMessageView(getMessageOrThrowException(id));
//    }

//    @Transactional
//    public MessageView createMessage(MessageDto messageDto) {
//        Message message = messageMapper.messageDtoToMessage(messageDto);
//        User fromUser = userService.getUserByIdOrThrowException(messageDto.fromUserId());
//        User toUser = userService.getUserByIdOrThrowException(messageDto.toUserId());
//        message.setFromUser(fromUser);
//        message.setToUser(toUser);
//        message.setConversation(conversationService
//                .getConversationByIdOrThrowException(messageDto.conversationId()));
//        message.setCreatedAt(TimeUtils.nowInUTC());
//        Message saved = messageRepository.save(message);
//        return messageMapper.messageToMessageView(saved);
//
//    }
//
//    @Transactional
//    public MessageView updateMessage(UUID messageId, MessageDto messageDto) {
//        Message actual = getMessageOrThrowException(messageId);
//        actual.setConversation(conversationService
//                .getConversationByIdOrThrowException(messageDto.conversationId()));
//        actual.setText(messageDto.text());
//
//        Message saved = messageRepository.save(actual);
//        return messageMapper.messageToMessageView(saved);
//    }
//
//    @Transactional
//    public void deleteMessage(UUID id) {
//        Message message = getMessageOrThrowException(id);
//        messageRepository.delete(message);
//    }
//
    public Message getMessageOrThrowException(UUID id) {
        return messageRepository.getMessageById(id)
                .orElseThrow(() -> new MessageNotFoundException(ErrorMessages.MESSAGE_NOT_FOUND, id));
    }

    private User getLogedUser(){
        UUID userId = TokenUtils.getUserId(SecurityContextHolder.getContext().getAuthentication());
        return userRepository.getReferenceById(userId);
    }

}
