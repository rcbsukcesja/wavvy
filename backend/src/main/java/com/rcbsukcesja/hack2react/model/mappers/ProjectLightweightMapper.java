package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.view.ProjectLightweightView;
import com.rcbsukcesja.hack2react.model.entity.Project;
import org.mapstruct.Mapper;

import java.util.Set;

@Mapper(componentModel = "spring")
public interface ProjectLightweightMapper {

    ProjectLightweightView projectToProjectLightweightView(Project project);

    Set<ProjectLightweightView> projectSetToProjectLightweightViewSet(Set<Project> projectSet);

}
