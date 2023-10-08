package com.rcbsukcesja.hack2react.repositories;

import com.rcbsukcesja.hack2react.model.entity.Project;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProjectRepository extends JpaRepository<Project, UUID> {

    @Query("SELECT p FROM Project p")
    @EntityGraph(attributePaths = {"categories", "tags", "organizer"})
    List<Project> getAll();

    @EntityGraph(attributePaths = {"categories", "tags", "organizer"})
    Optional<Project> getProjectById(UUID id);
}
