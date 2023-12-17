package com.rcbsukcesja.hack2react.repositories;

import com.rcbsukcesja.hack2react.model.entity.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface MessageRepository extends JpaRepository<Message, UUID>, JpaSpecificationExecutor<Message> {
    Optional<Message> getMessageById(UUID id);

    @NonNull
    Page<Message> findAll(@Nullable Specification<Message> spec, @Nullable Pageable pageable);

}
