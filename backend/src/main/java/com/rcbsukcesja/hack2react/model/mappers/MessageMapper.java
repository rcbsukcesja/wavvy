package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.MessageDto;
import com.rcbsukcesja.hack2react.model.entity.Message;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = UserMapper.class)
public interface MessageMapper {

    Message messageDtoToMessage(MessageDto messageDto);

    MessageDto messageToMessageDto(Message message);

    List<Message> messageDtoListToMessageList(List<MessageDto> messageDtos);

    List<MessageDto> messageListToMessageDtoList(List<Message> messages);


}
