package com.rcbsukcesja.hack2react.model.dto.save;

import lombok.Builder;

import java.util.Set;
import java.util.UUID;

@Builder
public record ConversationDto(
        Set<UUID> users
) {
}
