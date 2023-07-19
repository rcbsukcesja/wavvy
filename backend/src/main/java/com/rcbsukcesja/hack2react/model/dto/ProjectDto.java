package com.rcbsukcesja.hack2react.model.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.rcbsukcesja.hack2react.model.entity.BusinessArea;
import com.rcbsukcesja.hack2react.model.enums.ProjectStatus;
import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ProjectDto {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private UUID id;
    private String name;
    private String description;
    private String address;
    private String imageLink;
    private String link;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private BigDecimal budget;
    private String cooperationMessage;
    private String place;
    private List<BusinessAreaDto> categories;
    private ProjectStatus status;
    private List<String> tags;
    private boolean possibleVolunteer;
}
