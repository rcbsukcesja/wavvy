package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.save.ProjectDto;
import com.rcbsukcesja.hack2react.model.dto.view.ProjectView;
import com.rcbsukcesja.hack2react.model.entity.Project;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {BusinessAreaMapper.class, OrganizationNGOLightweightMapper.class})
public interface ProjectMapper {
    Project projectViewToProject(ProjectView projectView);
    ProjectView projectToProjectView(Project project);
    List<Project> projectViewListToProjectList(List<ProjectView> projectViewList);
    List<ProjectView> projectListToProjectViewList(List<Project> projectList);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "categories", ignore = true)
    @Mapping(target = "organizers", ignore = true)
    Project projectDtoToProject(ProjectDto projectDto);
}
