package com.rcbsukcesja.hack2react.model.dto;

import com.rcbsukcesja.hack2react.model.entity.User;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class MessageDto {

    private UUID id;
    private LocalDateTime createdAt;
    private User fromUser;
    private User toUser;
}
