package com.rcbsukcesja.hack2react.repositories;

import com.rcbsukcesja.hack2react.model.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProjectRepository extends JpaRepository<Project, UUID>, JpaSpecificationExecutor<Project> {

    @NonNull
    @EntityGraph(attributePaths = {"organizer.socialLinks", "tags", "organizer", "links"})
    Page<Project> findAll(@Nullable Specification<Project> spec, @Nullable Pageable pageable);

    @EntityGraph(attributePaths = {"organizer.socialLinks", "tags", "organizer", "links"})
    Optional<Project> getProjectById(UUID id);
}
