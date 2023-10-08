package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.entity.Resource;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ResourceMapper {

    List<String> ResourceListToStringList(List<Resource> resourceList);

    default String ResourceToString(Resource resource) {
        return resource != null ? resource.getResource() : null;
    }
}
