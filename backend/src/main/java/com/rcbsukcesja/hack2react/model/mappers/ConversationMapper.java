package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.ConversationDto;
import com.rcbsukcesja.hack2react.model.entity.Conversation;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = {UserMapper.class, MessageMapper.class})
public interface ConversationMapper {

    Conversation conversationDtoToConversation(ConversationDto conversationDto);

    ConversationDto conversationToConversationDto(Conversation conversation);

    List<Conversation> conversationDtoListToConversationList(List<ConversationDto> conversationDtos);

    List<ConversationDto> conversationListToConversationDtoList(List<Conversation> conversations);
}
