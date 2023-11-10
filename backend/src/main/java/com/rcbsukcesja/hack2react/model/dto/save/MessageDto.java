package com.rcbsukcesja.hack2react.model.dto.save;

import lombok.Builder;

import java.util.UUID;

@Builder
public record MessageDto(
        UUID fromUserId,
        UUID toUserId,
        String text
) {

}
