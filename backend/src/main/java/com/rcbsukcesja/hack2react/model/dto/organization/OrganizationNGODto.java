package com.rcbsukcesja.hack2react.model.dto.organization;

import com.rcbsukcesja.hack2react.model.dto.ProjectDto;
import com.rcbsukcesja.hack2react.model.entity.User;
import com.rcbsukcesja.hack2react.model.enums.LegalStatus;
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
public class OrganizationNGODto extends OrganizationDto {

    private LegalStatus legalStatus;
    private List<ProjectDto> projects;
    private List<CompanyDto> donors;
    private List<User> employees;

}
