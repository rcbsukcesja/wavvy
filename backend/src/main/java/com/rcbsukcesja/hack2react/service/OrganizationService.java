package com.rcbsukcesja.hack2react.service;

import com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages;
import com.rcbsukcesja.hack2react.exceptions.notFound.OrganizationNotFoundException;
import com.rcbsukcesja.hack2react.model.entity.Organization;
import com.rcbsukcesja.hack2react.repositories.OrganizationRepository;
import com.rcbsukcesja.hack2react.utils.FileUtils;
import com.rcbsukcesja.hack2react.utils.TimeUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrganizationService {

    private final OrganizationRepository organizationRepository;

    @Transactional
    public void updateLogoPath(String fileExtension, UUID id) {
        Organization organization = getOrganizationByIdOrThrowException(id);
        organization.setLogoPath(FileUtils.getPathAsString(fileExtension, id.toString(), "logo"));
        // TODO: change to getLogoUrl() when implemented
        organization.setLogoUrl(FileUtils.getPathAsString(fileExtension, id.toString(), "logo"));
        organization.setUpdatedAt(TimeUtils.nowInUTC());
        organizationRepository.save(organization);
    }

    @Transactional
    public String removeLogoPath(UUID ngoId) {
        Organization organization = getOrganizationByIdOrThrowException(ngoId);
        String filePath = organization.getLogoPath();
        organization.setLogoPath(null);
        organization.setLogoUrl(null);
        organization.setUpdatedAt(TimeUtils.nowInUTC());
        organizationRepository.save(organization);
        return filePath;
    }

    private Organization getOrganizationByIdOrThrowException(UUID id) {
        return organizationRepository.findById(id)
                .orElseThrow(() -> new OrganizationNotFoundException(
                        ErrorMessages.ORGANIZATION_NOT_FOUND, id));
    }

}
