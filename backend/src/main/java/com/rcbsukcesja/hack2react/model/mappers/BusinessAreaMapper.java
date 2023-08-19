package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.save.BusinessAreaDto;
import com.rcbsukcesja.hack2react.model.dto.view.BusinessAreaView;
import com.rcbsukcesja.hack2react.model.entity.BusinessArea;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BusinessAreaMapper {
    BusinessArea businessAreaViewToBusinessArea(BusinessAreaView businessAreaView);
    BusinessAreaView businessAreaToBusinessAreaView(BusinessArea businessArea);
    List<BusinessArea> businessAreaViewListToBusinessAreaList(List<BusinessAreaView> businessAreaViewList);
    List<BusinessAreaView> businessAreaListToBusinessAreaViewList(List<BusinessArea> businessAreaList);

    @Mapping(target = "id", ignore = true)
    BusinessArea businessAreaDtoToBusinessArea(BusinessAreaDto businessAreaDto);
}
