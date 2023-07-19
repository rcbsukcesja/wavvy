package com.rcbsukcesja.hack2react.model.dto;

import com.rcbsukcesja.hack2react.model.entity.Message;
import com.rcbsukcesja.hack2react.model.entity.User;
import lombok.*;

import java.util.List;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ConversationDto {

    private UUID id;
    private List<Message> messages;
    private List<User> users;
}
