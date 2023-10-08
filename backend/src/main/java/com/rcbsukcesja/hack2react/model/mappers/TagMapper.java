package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.entity.Tag;
import org.mapstruct.Mapper;

import java.util.Set;

@Mapper(componentModel = "spring")
public interface TagMapper {

    Set<String> TagSetToStringSet(Set<Tag> tagSet);

    default String TagToString(Tag tag) {
        return tag != null ? tag.getTag() : null;
    }
}
