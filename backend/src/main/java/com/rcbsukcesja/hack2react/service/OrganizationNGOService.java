package com.rcbsukcesja.hack2react.service;

import com.rcbsukcesja.hack2react.model.dto.organization.OrganizationNGODto;
import com.rcbsukcesja.hack2react.model.mappers.OrganizationNGOMapper;
import com.rcbsukcesja.hack2react.repositories.OrganizationNGORepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrganizationNGOService {
    private final OrganizationNGORepository organizationNGORepository;
    private final OrganizationNGOMapper organizationNGOMapper;

    public List<OrganizationNGODto> getAllNGO() {
        return organizationNGORepository.findAll().stream()
                .map(organizationNGOMapper::organizationNGOToOrganizationNGODto).toList();
    }

    public OrganizationNGODto getNGOById(UUID id) {
        return organizationNGOMapper
                .organizationNGOToOrganizationNGODto(organizationNGORepository.getReferenceById(id));
    }

}
