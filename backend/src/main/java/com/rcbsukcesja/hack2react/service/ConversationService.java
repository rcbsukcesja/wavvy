package com.rcbsukcesja.hack2react.service;

import com.rcbsukcesja.hack2react.model.dto.ConversationDto;
import com.rcbsukcesja.hack2react.model.entity.Conversation;
import com.rcbsukcesja.hack2react.model.mappers.ConversationMapper;
import com.rcbsukcesja.hack2react.repositories.ConversationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ConversationService {

    private final ConversationMapper conversationMapper;
    private final ConversationRepository conversationRepository;


    public List<ConversationDto> getConversationByUserId(UUID id) {
        return conversationMapper.conversationListToConversationDtoList(conversationRepository.getConversationByUsersId(id));
    }

    @Transactional
    public Conversation createConversation(ConversationDto conversationDto) {
        Conversation conversation = conversationMapper.conversationDtoToConversation(conversationDto);
        Conversation saved = conversationRepository.save(conversation);
        return saved;
    }

    @Transactional
    public void deleteConversation(UUID id) {
        Conversation conversation = conversationRepository.getConversationById(id);
        conversationRepository.delete(conversation);
    }
}
