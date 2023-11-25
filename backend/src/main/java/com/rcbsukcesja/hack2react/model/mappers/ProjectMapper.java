package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.view.ProjectView;
import com.rcbsukcesja.hack2react.model.entity.Project;
import com.rcbsukcesja.hack2react.utils.TimeUtils;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;

@Mapper(componentModel = "spring", uses = {
        ProjectLinkMapper.class,
        ProjectTagMapper.class,
        BusinessAreaMapper.class,
        OrganizationNGOLightweightMapper.class,
        AddressMapper.class
})
public interface ProjectMapper {

    ProjectView projectToProjectView(Project project);

    List<ProjectView> projectListToProjectViewList(List<Project> projectList);

    default LocalDateTime UTCtoLocalDateTimeInZone(ZonedDateTime zonedDateTime) {
        return TimeUtils.toLocalDateTimeInZone(zonedDateTime);
    }
}
