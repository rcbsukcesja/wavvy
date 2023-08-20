package com.rcbsukcesja.hack2react.service;

import com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages;
import com.rcbsukcesja.hack2react.exceptions.notFound.ProjectNotFoundException;
import com.rcbsukcesja.hack2react.model.dto.save.ProjectDto;
import com.rcbsukcesja.hack2react.model.dto.view.ProjectView;
import com.rcbsukcesja.hack2react.model.entity.BusinessArea;
import com.rcbsukcesja.hack2react.model.entity.OrganizationNGO;
import com.rcbsukcesja.hack2react.model.entity.Project;
import com.rcbsukcesja.hack2react.model.mappers.ProjectMapper;
import com.rcbsukcesja.hack2react.repositories.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectMapper projectMapper;
    private final ProjectRepository projectRepository;
    private final OrganizationNGOService organizationNGOService;
    private final BusinessAreaService businessAreaService;

    public List<ProjectView> getAllProjects() {
        return projectMapper.projectListToProjectViewList(projectRepository.findAll());
    }

    public ProjectView getProjectById(UUID projectId) {
        return projectMapper.projectToProjectView(getProjectByIdOrThrowException(projectId));
    }

    @Transactional
    public ProjectView createOrUpdateProject(UUID projectId, ProjectDto projectDto) {
        Project project = projectMapper.projectDtoToProject(projectDto);
        if (projectId != null) {
            getProjectByIdOrThrowException(projectId); // check if project exists
            project.setId(projectId);
        }
        if (projectDto.categoryIds() != null && !projectDto.categoryIds().isEmpty()) {
            Set<BusinessArea> categories = businessAreaService
                    .getBusinessAreasOrThrowException(projectDto.categoryIds());
            project.setCategories(categories);
        }
        if (projectDto.organizerIds() != null && !projectDto.organizerIds().isEmpty()) {
            Set<OrganizationNGO> organizers = organizationNGOService
                    .getNGOsOrThrowException(projectDto.organizerIds());
            project.setOrganizers(organizers);
        }
        return projectMapper.projectToProjectView(projectRepository.save(project));
    }

    @Transactional
    public void deleteProject(UUID projectId) {
        Project project = getProjectByIdOrThrowException(projectId);
        projectRepository.delete(project);
    }

    public Project getProjectByIdOrThrowException(UUID projectId) {
        return projectRepository.getProjectById(projectId)
                .orElseThrow(() -> new ProjectNotFoundException(ErrorMessages.PROJECT_NOT_FOUND, projectId));
    }

    public Set<Project> getProjectsByIdOrThrowException(Set<UUID> projectIds) {
        return new HashSet<>(projectIds.stream()
                .map(this::getProjectByIdOrThrowException)
                .toList());
    }

}
