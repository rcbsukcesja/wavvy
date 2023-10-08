package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.entity.SocialLink;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SocialLinkMapper {

    List<String> SocialLinkListToStringList(List<SocialLink> socialLinkList);

    default String SocialLinkToString(SocialLink socialLink) {
        return socialLink != null ? socialLink.getLink() : null;
    }
}
