package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.view.ProjectView;
import com.rcbsukcesja.hack2react.model.entity.Project;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = {TagMapper.class, BusinessAreaMapper.class, OrganizationNGOLightweightMapper.class})
public interface ProjectMapper {

    ProjectView projectToProjectView(Project project);

    List<ProjectView> projectListToProjectViewList(List<Project> projectList);
}
