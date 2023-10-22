package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.entity.ProjectLink;
import org.mapstruct.Mapper;

import java.util.Set;

@Mapper(componentModel = "spring")
public interface ProjectLinkMapper {

    Set<String> ProjectLinkSetToStringSet(Set<ProjectLink> tagSet);

    default String ProjectLinkToString(ProjectLink tag) {
        return tag != null ? tag.getLink() : null;
    }
}
