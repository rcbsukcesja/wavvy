package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.view.ProjectView;
import com.rcbsukcesja.hack2react.model.entity.Project;
import com.rcbsukcesja.hack2react.utils.TimeUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.time.ZonedDateTime;
import java.util.List;

@Mapper(componentModel = "spring", uses = {TagMapper.class, BusinessAreaMapper.class, OrganizationNGOLightweightMapper.class})
public interface ProjectMapper {

    @Mapping(source = "startTime", target = "startTime", qualifiedByName = "UTCtoZonedDateTime")
    @Mapping(source = "endTime", target = "endTime", qualifiedByName = "UTCtoZonedDateTime")
    ProjectView projectToProjectView(Project project);

    List<ProjectView> projectListToProjectViewList(List<Project> projectList);

    @Named("UTCtoZonedDateTime")
    default ZonedDateTime UTCtoZonedDateTime(ZonedDateTime zonedDateTime) {
        return TimeUtils.dateTimeInZone(zonedDateTime);
    }
}
