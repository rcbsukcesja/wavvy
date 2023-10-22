package com.rcbsukcesja.hack2react.model.mappers;

import com.rcbsukcesja.hack2react.model.dto.save.OrganizationAddressPatchDto;
import com.rcbsukcesja.hack2react.model.dto.save.OrganizationAddressSaveDto;
import com.rcbsukcesja.hack2react.model.dto.save.ProjectAddressPatchDto;
import com.rcbsukcesja.hack2react.model.dto.save.ProjectAddressSaveDto;
import com.rcbsukcesja.hack2react.model.dto.view.AddressView;
import com.rcbsukcesja.hack2react.model.entity.Address;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AddressMapper {

    AddressView addressToAddressView(Address address);

    Address addressViewToAddress(AddressView addressView);

    Address organizationAddressSaveDtoToAddress(OrganizationAddressSaveDto organizationAddressSaveDto);

    Address organizationAddressPatchDtoToAddress(OrganizationAddressPatchDto organizationAddressPatchDto);

    Address projectAddressSaveDtoToAddress(ProjectAddressSaveDto projectAddressSaveDto);

    Address projectAddressPatchDtoToAddress(ProjectAddressPatchDto projectAddressPatchDto);

}
