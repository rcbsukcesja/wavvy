package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.save.MessageDto;
import com.rcbsukcesja.hack2react.model.dto.view.MessageView;
import com.rcbsukcesja.hack2react.model.entity.Message;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = UserLightweightMapper.class)
public interface MessageMapper {

    Message messageViewToMessage(MessageView messageView);
    MessageView messageToMessageView(Message message);

    List<Message> messageViewListToMessageList(List<MessageView> messageViews);

    List<MessageView> messageListToMessageViewList(List<Message> messages);

    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "id", ignore = true)
    Message messageDtoToMessage(MessageDto messageDto);
}
