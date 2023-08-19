package com.rcbsukcesja.hack2react.service;

import com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages;
import com.rcbsukcesja.hack2react.exceptions.notFound.ConversationNotFoundException;
import com.rcbsukcesja.hack2react.model.dto.save.ConversationDto;
import com.rcbsukcesja.hack2react.model.dto.view.ConversationView;
import com.rcbsukcesja.hack2react.model.entity.Conversation;
import com.rcbsukcesja.hack2react.model.entity.User;
import com.rcbsukcesja.hack2react.model.mappers.ConversationMapper;
import com.rcbsukcesja.hack2react.repositories.ConversationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConversationService {

    private final ConversationMapper conversationMapper;
    private final ConversationRepository conversationRepository;
    private final UserService userService;

    public List<ConversationView> getConversationByUserId(UUID userId) {
        userService.getUserByIdOrThrowException(userId); //check if user exists
        return conversationMapper.conversationListToConversationViewList(conversationRepository.getConversationByUsersId(userId));
    }

    @Transactional
    public ConversationView createConversation(ConversationDto conversationDto) {
        Set<User> users = conversationDto.users().stream()
                .map(userService::getUserByIdOrThrowException)
                .collect(Collectors.toSet());

        Conversation conversation = Conversation.builder()
                .users(users)
                .build();
        Conversation saved = conversationRepository.save(conversation);
        return conversationMapper.conversationToConversationView(saved);
    }

    @Transactional
    public void deleteConversation(UUID id) {
        Conversation conversation = getConversationByIdOrThrowException(id);
        conversationRepository.delete(conversation);
    }

    public Conversation getConversationByIdOrThrowException(UUID id) {
        return conversationRepository.getConversationById(id)
                .orElseThrow(() -> new ConversationNotFoundException(
                        ErrorMessages.CONVERSATION_NOT_FOUND, id));
    }

}
