package com.rcbsukcesja.hack2react.model.dto.view;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class ConversationView {

    private UUID id;
    private List<MessageView> messages;
    private Set<UserLightweightView> users;
}
