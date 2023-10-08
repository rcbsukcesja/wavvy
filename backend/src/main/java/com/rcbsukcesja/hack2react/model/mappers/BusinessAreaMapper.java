package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.view.BusinessAreaView;
import com.rcbsukcesja.hack2react.model.entity.BusinessArea;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring")
public interface BusinessAreaMapper {
    BusinessAreaView businessAreaToBusinessAreaView(BusinessArea businessArea);

    List<BusinessAreaView> businessAreaListToBusinessAreaViewList(List<BusinessArea> businessAreaList);

    Set<BusinessAreaView> businessAreaSetToBusinessAreaViewSet(Set<BusinessArea> businessAreaSet);
}
