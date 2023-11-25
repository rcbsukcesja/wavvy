package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.entity.OrganizationNGOTag;
import org.mapstruct.Mapper;

import java.util.Set;

@Mapper(componentModel = "spring")
public interface OrganizationNGOTagMapper {

    Set<String> TagSetToStringSet(Set<OrganizationNGOTag> organizationNGOTagSet);

    default String TagToString(OrganizationNGOTag organizationNGOTag) {
        return organizationNGOTag != null ? organizationNGOTag.getTag() : null;
    }
}
