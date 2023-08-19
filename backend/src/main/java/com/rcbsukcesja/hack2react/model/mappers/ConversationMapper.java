package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.view.ConversationView;
import com.rcbsukcesja.hack2react.model.entity.Conversation;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = {UserMapper.class, MessageMapper.class})
public interface ConversationMapper {

    Conversation conversationViewToConversation(ConversationView conversationView);

    ConversationView conversationToConversationView(Conversation conversation);

    List<Conversation> conversationViewListToConversationList(List<ConversationView> conversationViews);

    List<ConversationView> conversationListToConversationViewList(List<Conversation> conversations);

}
