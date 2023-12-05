package com.rcbsukcesja.hack2react.service;

import com.rcbsukcesja.hack2react.exceptions.io.StorageException;
import com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages;
import com.rcbsukcesja.hack2react.exceptions.notFound.OrganizationNotFoundException;
import com.rcbsukcesja.hack2react.model.entity.Organization;
import com.rcbsukcesja.hack2react.repositories.OrganizationRepository;
import com.rcbsukcesja.hack2react.utils.FileUtils;
import com.rcbsukcesja.hack2react.utils.TimeUtils;
import com.rcbsukcesja.hack2react.validations.UserValidation;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

import static com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages.FILE_EXTENSION_FAILURE;

@Service
@RequiredArgsConstructor
public class OrganizationService {

    private final OrganizationRepository organizationRepository;
    private final UserValidation userValidation;
    private final StorageService storageService;

    @Value("${wavvy.images.logo.url}")
    private String logoUrl;

    @Transactional
    public void updateLogo(MultipartFile file, UUID organizationId, String directory) {
        Organization organization = getOrganizationByIdOrThrowException(organizationId);
        userValidation.checkIfIsOwner(organization.getOwner().getId());
        String oldFilePath = removeLogoPathAndLinkAndReturnPath(organization);
        storageService.store(file, organizationId, directory);
        String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename());
        if (fileExtension == null) {
            throw new StorageException(FILE_EXTENSION_FAILURE);
        }
        String newFilePath = FileUtils.getPathAsString(fileExtension, organizationId, directory);
        organization.setLogoPath(newFilePath);
        organization.setLogoUrl(logoUrl + "/" + organizationId + "." + fileExtension.toLowerCase());
        organization.setUpdatedAt(TimeUtils.nowInUTC());
        organizationRepository.saveAndFlush(organization);
        if (oldFilePath != null && !oldFilePath.equals(newFilePath)) {
            removeLogo(oldFilePath);
        }
    }

    @Transactional
    public void removeLogo(UUID organizationId) {
        Organization organization = getOrganizationByIdOrThrowException(organizationId);
        userValidation.checkIfIsOwner(organization.getOwner().getId());
        String filePath = removeLogoPathAndLinkAndReturnPath(organization);
        removeLogo(filePath);
    }

    private String removeLogoPathAndLinkAndReturnPath(Organization organization) {
        String filePath = organization.getLogoPath();
        organization.setLogoPath(null);
        organization.setLogoUrl(null);
        organization.setUpdatedAt(TimeUtils.nowInUTC());
        organizationRepository.saveAndFlush(organization);
        return filePath;
    }

    private void removeLogo(String filePath) {
        if (filePath != null) {
            storageService.remove(filePath);
        }
    }

    private Organization getOrganizationByIdOrThrowException(UUID id) {
        return organizationRepository.findById(id)
                .orElseThrow(() -> new OrganizationNotFoundException(
                        ErrorMessages.ORGANIZATION_NOT_FOUND, id));
    }

}
