package com.rcbsukcesja.hack2react.model.dto.view;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.ZonedDateTime;
import java.util.UUID;


@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class MessageView {
    private UUID id;
    private UUID conversationId;
    private ZonedDateTime createdAt;
    private UserLightweightView fromUser;
    private UserLightweightView toUser;
    private String text;
}
