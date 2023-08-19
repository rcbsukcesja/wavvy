package com.rcbsukcesja.hack2react.model.dto.save;

import com.rcbsukcesja.hack2react.model.enums.ProjectStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Builder
public record ProjectDto(
        @NotBlank(message = "Project name cannot be blank")
        String name,
        @NotBlank(message = "Project description cannot be blank")
        String description,
        @NotBlank(message = "Project address cannot be blank")
        String address,
        @NotBlank(message = "Project image link cannot be blank")
        String imageLink,
        String link,
        @NotNull(message = "Project start time cannot be null")
        LocalDateTime startTime,
        @NotNull(message = "Project end time cannot be null")
        LocalDateTime endTime,
        @NotNull(message = "Project budget cannot be null")
        BigDecimal budget,
        String cooperationMessage,
        Set<UUID> organizerIds,
        Set<UUID> categoryIds,
        @NotNull(message = "Project status cannot be null")
        ProjectStatus status,
        Set<String> tags,
        @NotNull(message = "Project possible volunteer cannot be null")
        boolean possibleVolunteer
) {
}
