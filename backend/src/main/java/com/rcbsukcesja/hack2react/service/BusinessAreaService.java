package com.rcbsukcesja.hack2react.service;

import com.rcbsukcesja.hack2react.model.entity.BusinessArea;
import com.rcbsukcesja.hack2react.repositories.BusinessAreaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BusinessAreaService {
    private final BusinessAreaRepository businessAreaRepository;

    public List<BusinessArea> getAllBusinessAreas() {
        return businessAreaRepository.findAll();
    }

}
