package com.rcbsukcesja.hack2react.repositories;

import com.rcbsukcesja.hack2react.model.entity.Message;
import com.rcbsukcesja.hack2react.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MessageRepository extends JpaRepository<Message, UUID> {
    Optional<Message> getMessageById(UUID id);

    List<Message> getMessageBySender(User sender);

    List<Message> getMessageByReceiver(User receiver);
}
