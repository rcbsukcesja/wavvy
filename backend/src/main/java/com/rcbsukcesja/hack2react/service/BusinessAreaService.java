package com.rcbsukcesja.hack2react.service;

import com.rcbsukcesja.hack2react.exceptions.alreadyExists.BusinessAreaNameAlreadyExistsException;
import com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages;
import com.rcbsukcesja.hack2react.exceptions.notFound.BusinessAreaNotFoundException;
import com.rcbsukcesja.hack2react.model.dto.save.BusinessAreaDto;
import com.rcbsukcesja.hack2react.model.dto.view.BusinessAreaView;
import com.rcbsukcesja.hack2react.model.entity.BusinessArea;
import com.rcbsukcesja.hack2react.model.mappers.BusinessAreaMapper;
import com.rcbsukcesja.hack2react.repositories.BusinessAreaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BusinessAreaService {
    private final BusinessAreaRepository businessAreaRepository;
    private final BusinessAreaMapper businessAreaMapper;

    public List<BusinessAreaView> getAllBusinessAreas() {
        return businessAreaMapper.businessAreaListToBusinessAreaViewList(
                businessAreaRepository.findAll());
    }

    public BusinessAreaView getBusinessAreaById(UUID businessAreaId) {
        return businessAreaMapper.businessAreaToBusinessAreaView(
                getBusinessAreaByIdOrThrowException(businessAreaId));
    }

    @Transactional
    public BusinessAreaView saveBusinessArea(UUID businessAreaId, BusinessAreaDto dto) {
        if (businessAreaId != null) {
            BusinessArea actual = getBusinessAreaByIdOrThrowException(businessAreaId);
            if (!actual.getName().equalsIgnoreCase(dto.name())) {
                checkIfBusinessAreaNameAlreadyExists(dto.name());
            }
            actual.setName(dto.name());
            BusinessArea updated = businessAreaRepository.save(actual);
            return businessAreaMapper.businessAreaToBusinessAreaView(updated);
        } else {
            checkIfBusinessAreaNameAlreadyExists(dto.name());
            BusinessArea businessArea = BusinessArea.builder()
                    .name(dto.name())
                    .build();
            BusinessArea saved = businessAreaRepository.save(businessArea);
            return businessAreaMapper.businessAreaToBusinessAreaView(saved);
        }
    }

    public void deleteBusinessArea(UUID businessAreaId) {
        BusinessArea businessArea = getBusinessAreaByIdOrThrowException(businessAreaId);
        businessAreaRepository.delete(businessArea);
    }

    private void checkIfBusinessAreaNameAlreadyExists(String name) {
        if (businessAreaRepository.existsByNameIgnoreCase(name)) {
            throw new BusinessAreaNameAlreadyExistsException(
                    ErrorMessages.BUSINESS_AREA_ALREADY_EXISTS, name);
        }
    }

    private BusinessArea getBusinessAreaByIdOrThrowException(UUID id) {
        return businessAreaRepository.getBusinessAreaById(id)
                .orElseThrow(() -> new BusinessAreaNotFoundException(
                        ErrorMessages.BUSINESS_AREA_NOT_FOUND, id));
    }

}
