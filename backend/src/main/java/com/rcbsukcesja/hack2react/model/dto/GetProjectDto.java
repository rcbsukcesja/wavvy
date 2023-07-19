package com.rcbsukcesja.hack2react.model.dto;

import com.rcbsukcesja.hack2react.model.entity.BusinessArea;
import com.rcbsukcesja.hack2react.model.enums.ProjectStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class GetProjectDto {
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
