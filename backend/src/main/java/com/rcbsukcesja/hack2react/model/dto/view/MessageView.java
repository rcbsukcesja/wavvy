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
    private ZonedDateTime createdAt;
    private UserLightweightView sender;
    private UserLightweightView receiver;
    private String contact;
    private String message;
    private String title;
    private String name;
    private ZonedDateTime updatedAt;
}
