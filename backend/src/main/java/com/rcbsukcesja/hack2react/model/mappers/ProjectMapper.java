package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.ProjectDto;
import com.rcbsukcesja.hack2react.model.entity.Project;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = BusinessAreaMapper.class)
public interface ProjectMapper {
    Project projectDtoToProject(ProjectDto projectDto);
    ProjectDto projectToProjectDto(Project project);
    List<Project> projectDtoListToProjectList(List<ProjectDto> projectDtoList);
    List<ProjectDto> projectListToProjectDtoList(List<Project> projectList);
}
