package com.rcbsukcesja.hack2react.service;

import com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages;
import com.rcbsukcesja.hack2react.exceptions.notFound.BusinessAreaNotFoundException;
import com.rcbsukcesja.hack2react.exceptions.notFound.OrganizationNGONotFoundException;
import com.rcbsukcesja.hack2react.exceptions.notFound.ProjectNotFoundException;
import com.rcbsukcesja.hack2react.model.dto.save.ProjectPatchDto;
import com.rcbsukcesja.hack2react.model.dto.save.ProjectSaveDto;
import com.rcbsukcesja.hack2react.model.dto.view.ProjectView;
import com.rcbsukcesja.hack2react.model.entity.BusinessArea;
import com.rcbsukcesja.hack2react.model.entity.OrganizationNGO;
import com.rcbsukcesja.hack2react.model.entity.Project;
import com.rcbsukcesja.hack2react.model.entity.Tag;
import com.rcbsukcesja.hack2react.model.mappers.ProjectMapper;
import com.rcbsukcesja.hack2react.repositories.BusinessAreaRepository;
import com.rcbsukcesja.hack2react.repositories.OrganizationNGORepository;
import com.rcbsukcesja.hack2react.repositories.ProjectRepository;
import com.rcbsukcesja.hack2react.utils.TimeUtils;
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
    private final OrganizationNGORepository organizationNGORepository;
    private final BusinessAreaRepository businessAreaRepository;

    public List<ProjectView> getAllProjects() {
        return projectMapper.projectListToProjectViewList(projectRepository.getAll());
    }

    public ProjectView getProjectById(UUID projectId) {
        return projectMapper.projectToProjectView(getProjectByIdOrThrowException(projectId));
    }

    @Transactional
    public ProjectView saveProject(UUID projectId, ProjectSaveDto dto) {
        Project project;
        if (projectId == null) {
            project = new Project();

            project.setCategories(new HashSet<>());
            if (dto.categoryIds() != null && !dto.categoryIds().isEmpty()) {
                Set<BusinessArea> categories = getBusinessAreasOrThrowException(dto.categoryIds());
                project.setCategories(categories);
            }

            project.setTags(new HashSet<>());
            if (dto.tags() != null && !dto.tags().isEmpty()) {
                for (String tag : dto.tags()) {
                    Tag newTag = new Tag();
                    newTag.setTag(tag);
                    project.getTags().add(newTag);
                    projectRepository.save(project);
                }
            }
        } else {
            project = getProjectByIdOrThrowException(projectId);

            updateCategories(project, dto.categoryIds());
            updateTags(project, dto.tags());

        }

        project.setName(dto.name());
        project.setDescription(dto.description());
        project.setAddress(dto.address());
        project.setImageLink(dto.imageLink());
        project.setLink(dto.link());
        project.setStartTime(TimeUtils.dateTimeInUTC(dto.startTime()));
        project.setEndTime(TimeUtils.dateTimeInUTC(dto.endTime()));
        project.setBudget(dto.budget());
        project.setCooperationMessage(dto.cooperationMessage());
        project.setPossibleVolunteer(dto.possibleVolunteer());
        project.setStatus(dto.status());
        project.setOrganizer(getNgoByIdOrThrowException(dto.organizerId()));

        return projectMapper.projectToProjectView(projectRepository.save(project));
    }

    @Transactional
    public ProjectView updateProject(UUID projectId, ProjectPatchDto dto) {
        Project project = getProjectByIdOrThrowException(projectId);
        if (dto.name() != null && !dto.name().equals(project.getName())) {
            project.setName(dto.name());
        }
        if (dto.description() != null && !dto.description().equals(project.getDescription())) {
            project.setDescription(dto.description());
        }
        if (dto.address() != null && !dto.address().equals(project.getAddress())) {
            project.setAddress(dto.address());
        }
        if (dto.imageLink() != null && !dto.imageLink().equals(project.getImageLink())) {
            project.setImageLink(dto.imageLink());
        }
        if (dto.link() != null && !dto.link().equals(project.getLink())) {
            project.setLink(dto.link());
        }
        if (dto.startTime() != null && !dto.startTime().equals(project.getStartTime())) {
            project.setStartTime(TimeUtils.dateTimeInUTC(dto.startTime()));
        }
        if (dto.endTime() != null && !dto.endTime().equals(project.getEndTime())) {
            project.setEndTime(TimeUtils.dateTimeInUTC(dto.endTime()));
        }
        if (dto.budget() != null && !dto.budget().equals(project.getBudget())) {
            project.setBudget(dto.budget());
        }
        if (dto.cooperationMessage() != null && !dto.cooperationMessage().equals(project.getCooperationMessage())) {
            project.setCooperationMessage(dto.cooperationMessage());
        }
        if (dto.organizerId() != null && !dto.organizerId().equals(project.getOrganizer().getId())) {
            project.setOrganizer(getNgoByIdOrThrowException(dto.organizerId()));
        }
        if (dto.status() != null && !dto.status().equals(project.getStatus())) {
            project.setStatus(dto.status());
        }
        if (dto.possibleVolunteer() != project.isPossibleVolunteer()) {
            project.setPossibleVolunteer(dto.possibleVolunteer());
        }
        updateTags(project, dto.tags());
        updateCategories(project, dto.categoryIds());


        return projectMapper.projectToProjectView(projectRepository.save(project));
    }

    @Transactional
    public void deleteProject(UUID projectId) {
        Project project = getProjectByIdOrThrowException(projectId);
        projectRepository.delete(project);
    }

    private void updateTags(Project project, Set<String> tags) {
        if (tags != null) {
            if (tags.isEmpty()) {
                project.getTags().clear();
            } else {
                project.getTags().removeIf(tag -> !tags.contains(tag.getTag()));

                for (String tag : tags) {
                    if (project.getTags().stream()
                            .noneMatch(actualTag -> actualTag.getTag().equals(tag))) {
                        Tag newTag = new Tag();
                        newTag.setTag(tag);
                        newTag.setProject(project);
                        project.getTags().add(newTag);
                        projectRepository.save(project);
                    }
                }
            }
        }
    }

    private void updateCategories(Project project, Set<UUID> categoryIds) {
        if (categoryIds != null) {
            if (categoryIds.isEmpty()) {
                project.getCategories().clear();
            } else {
                project.getCategories().removeIf(category -> !categoryIds.contains(category.getId()));

                for (UUID categoryId : categoryIds) {
                    if (project.getCategories().stream()
                            .noneMatch(actualCategory -> actualCategory.getId().equals(categoryId))) {
                        BusinessArea category = getBusinessAreaByIdOrThrowException(categoryId);
                        project.getCategories().add(category);
                        projectRepository.save(project);
                    }
                }
            }
        }
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

    private OrganizationNGO getNgoByIdOrThrowException(UUID id) {
        return organizationNGORepository.getOrganizationNGOById(id)
                .orElseThrow(() -> new OrganizationNGONotFoundException(
                        ErrorMessages.ORGANIZATION_NGO_NOT_FOUND, id));
    }

    private BusinessArea getBusinessAreaByIdOrThrowException(UUID id) {
        return businessAreaRepository.getBusinessAreaById(id)
                .orElseThrow(() -> new BusinessAreaNotFoundException(
                        ErrorMessages.BUSINESS_AREA_NOT_FOUND, id));
    }

    private Set<BusinessArea> getBusinessAreasOrThrowException(Set<UUID> ids) {
        return new HashSet<>(ids.stream()
                .map(this::getBusinessAreaByIdOrThrowException)
                .toList());
    }
}
