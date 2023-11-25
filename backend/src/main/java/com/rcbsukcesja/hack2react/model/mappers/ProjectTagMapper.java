package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.entity.ProjectTag;
import org.mapstruct.Mapper;

import java.util.Set;

@Mapper(componentModel = "spring")
public interface ProjectTagMapper {

    Set<String> TagSetToStringSet(Set<ProjectTag> projectTagSet);

    default String TagToString(ProjectTag projectTag) {
        return projectTag != null ? projectTag.getTag() : null;
    }
}
