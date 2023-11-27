package com.rcbsukcesja.hack2react.model.dto.save;

import lombok.Builder;

import java.util.UUID;

@Builder
public record MessageDto(

        UUID receiverId,
        String message,
        String name,
        String contact,
        String title
) {

}
