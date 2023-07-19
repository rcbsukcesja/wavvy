package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.BusinessAreaDto;
import com.rcbsukcesja.hack2react.model.entity.BusinessArea;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BusinessAreaMapper {
    BusinessArea businessAreaDtoToBusinessArea(BusinessAreaDto businessAreaDto);
    BusinessAreaDto businessAreaToBusinessAreaDto(BusinessArea businessArea);
    List<BusinessArea> businessAreaDtoListToBusinessAreaList(List<BusinessAreaDto> businessAreaDtoList);
    List<BusinessAreaDto> businessAreaListToBusinessAreaDtoList(List<BusinessArea> businessAreaList);
}
