package com.rcbsukcesja.hack2react.model.dto.organization;

import com.rcbsukcesja.hack2react.model.dto.ProjectDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Getter
@Setter
public class CompanyDto extends OrganizationDto {

    private List<ProjectDto> donatedProjects;
}
