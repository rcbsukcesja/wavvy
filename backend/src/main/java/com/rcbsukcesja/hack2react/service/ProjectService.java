package com.rcbsukcesja.hack2react.service;

import com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages;
import com.rcbsukcesja.hack2react.exceptions.notFound.OrganizationNGONotFoundException;
import com.rcbsukcesja.hack2react.exceptions.notFound.ProjectNotFoundException;
import com.rcbsukcesja.hack2react.model.dto.save.ProjectPatchDto;
import com.rcbsukcesja.hack2react.model.dto.save.ProjectSaveDto;
import com.rcbsukcesja.hack2react.model.dto.view.ProjectView;
import com.rcbsukcesja.hack2react.model.entity.OrganizationNGO;
import com.rcbsukcesja.hack2react.model.entity.Project;
import com.rcbsukcesja.hack2react.model.entity.ProjectLink;
import com.rcbsukcesja.hack2react.model.entity.ProjectTag;
import com.rcbsukcesja.hack2react.model.enums.ProjectStatus;
import com.rcbsukcesja.hack2react.model.mappers.AddressMapper;
import com.rcbsukcesja.hack2react.model.mappers.ProjectMapper;
import com.rcbsukcesja.hack2react.repositories.OrganizationNGORepository;
import com.rcbsukcesja.hack2react.repositories.ProjectRepository;
import com.rcbsukcesja.hack2react.specifications.ProjectSpecifications;
import com.rcbsukcesja.hack2react.utils.FileUtils;
import com.rcbsukcesja.hack2react.utils.TimeUtils;
import com.rcbsukcesja.hack2react.validations.DateValidation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
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
    private final DateValidation dateValidation;
    private final AddressMapper addressMapper;

    @Value("${wavvy.images.project.url}")
    private String projectUrl;

    public Page<ProjectView> getAllProjects(String search, List<ProjectStatus> statusList, LocalDate startDate,
                                            LocalDate endDate, Pageable pageable) {
        dateValidation.isStartDateBeforeOrEqualEndDate(startDate, endDate);
        Specification<Project> spec = ProjectSpecifications.notOutsideDateRange(startDate, endDate);
        if (search != null && !search.isEmpty()) {
            spec = spec.and(ProjectSpecifications.nameOrTagsContain(search));
        }
        if (statusList != null && !statusList.isEmpty()) {
            spec = spec.and(ProjectSpecifications.statusInStatusList(statusList));
        }
        return projectRepository.findAll(spec, pageable).map(projectMapper::projectToProjectView);
    }

    public ProjectView getProjectById(UUID projectId) {
        return projectMapper.projectToProjectView(getProjectByIdOrThrowException(projectId));
    }

    @Transactional
    public ProjectView createProject(ProjectSaveDto dto) {
        Project project = new Project();

        setBasicProjectFields(dto, project);
        project.setTags(new HashSet<>());
        project.setLinks(new HashSet<>());

        project = projectRepository.save(project);

        if (dto.tags() != null && !dto.tags().isEmpty()) {
            Set<ProjectTag> projectTags = new HashSet<>();
            for (String tag : dto.tags()) {
                ProjectTag newProjectTag = new ProjectTag();
                newProjectTag.setId(UUID.randomUUID());
                newProjectTag.setProject(project);
                newProjectTag.setTag(tag);
                projectTags.add(newProjectTag);
            }
            project.setTags(projectTags);
        }

        if (dto.links() != null && !dto.links().isEmpty()) {
            Set<ProjectLink> links = new HashSet<>();
            for (String link : dto.links()) {
                ProjectLink newLink = new ProjectLink();
                newLink.setId(UUID.randomUUID());
                newLink.setProject(project);
                newLink.setLink(link);
                links.add(newLink);
            }
            project.setLinks(links);
            project.setDisabled(false);
        }

        return projectMapper.projectToProjectView(projectRepository.saveAndFlush(project));
    }

    @Transactional
    public ProjectView putUpdateProject(UUID projectId, ProjectSaveDto dto) {
        Project project = getProjectByIdOrThrowException(projectId);

        setBasicProjectFields(dto, project);

        updateTags(project, dto.tags());
        updateLinks(project, dto.links());

        project.setUpdatedAt(TimeUtils.nowInUTC());

        return projectMapper.projectToProjectView(projectRepository.saveAndFlush(project));
    }

    @Transactional
    public ProjectView patchUpdateProject(UUID projectId, ProjectPatchDto dto) {
        Project project = getProjectByIdOrThrowException(projectId);
        if (dto.name() != null && !dto.name().equals(project.getName())) {
            project.setName(dto.name());
        }
        if (dto.description() != null && !dto.description().equals(project.getDescription())) {
            project.setDescription(dto.description());
        }
        if (dto.address() != null && !project.getAddress().equals(addressMapper.projectAddressPatchDtoToAddress(dto.address()))) {
            project.setAddress(addressMapper.projectAddressPatchDtoToAddress(dto.address()));
        }
        if (dto.startTime() != null && !dto.startTime().equals(project.getStartTime())) {
            project.setStartTime(TimeUtils.zonedDateTimeInUTC(dto.startTime()));
        }
        if (dto.endTime() != null && !dto.endTime().equals(project.getEndTime())) {
            project.setEndTime(TimeUtils.zonedDateTimeInUTC(dto.endTime()));
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
        if(!dto.disabled() != project.isDisabled()){
            project.setDisabled(dto.disabled());
        }
        if(dto.reason() != null && ! dto.reason().equals(project.getReason())){
            project.setReason(dto.reason());
        }

        updateTags(project, dto.tags());
        updateLinks(project, dto.links());

        project.setUpdatedAt(TimeUtils.nowInUTC());

        return projectMapper.projectToProjectView(projectRepository.saveAndFlush(project));
    }

    @Transactional
    public void deleteProject(UUID projectId) {
        Project project = getProjectByIdOrThrowException(projectId);
        projectRepository.delete(project);
    }

    @Transactional
    public void updateImagePath(String fileExtension, UUID id, String directory) {
        Project project = getProjectByIdOrThrowException(id);
        project.setImagePath(FileUtils.getPathAsString(fileExtension, id.toString(), directory));
        project.setImageLink(projectUrl + "/" + id + "." + fileExtension.toLowerCase());
        project.setUpdatedAt(TimeUtils.nowInUTC());
        projectRepository.saveAndFlush(project);
    }

    @Transactional
    public String removeImagePath(UUID id) {
        Project project = getProjectByIdOrThrowException(id);
        String filePath = project.getImagePath();
        project.setImagePath(null);
        project.setImageLink(null);

        project.setUpdatedAt(TimeUtils.nowInUTC());
        projectRepository.saveAndFlush(project);
        return filePath;
    }

    private void setBasicProjectFields(ProjectSaveDto dto, Project project) {
        project.setName(dto.name());
        project.setDescription(dto.description());
        project.setAddress(addressMapper.projectAddressSaveDtoToAddress(dto.address()));
        project.setStartTime(TimeUtils.zonedDateTimeInUTC(dto.startTime()));
        project.setEndTime(TimeUtils.zonedDateTimeInUTC(dto.endTime()));
        project.setBudget(dto.budget());
        project.setCooperationMessage(dto.cooperationMessage());
        project.setPossibleVolunteer(dto.possibleVolunteer());
        project.setStatus(dto.status());
        project.setOrganizer(getNgoByIdOrThrowException(dto.organizerId()));
        project.setReason(dto.reason());
    }

    private void updateTags(Project project, Set<String> tags) {
        if (tags != null) {
            if(project.getTags() == null) {
                project.setTags(new HashSet<>());
            }
            if (tags.isEmpty()) {
                project.getTags().clear();
            } else {
                project.getTags().removeIf(projectTag -> !tags.contains(projectTag.getTag()));

                for (String tag : tags) {
                    if (project.getTags().stream()
                            .noneMatch(actualProjectTag -> actualProjectTag.getTag().equals(tag))) {
                        ProjectTag newProjectTag = new ProjectTag();
                        newProjectTag.setTag(tag);
                        newProjectTag.setProject(project);
                        project.getTags().add(newProjectTag);
                    }
                }
            }
        }
    }

    private void updateLinks(Project project, Set<String> links) {
        if (links != null) {
            if(project.getLinks() == null) {
                project.setLinks(new HashSet<>());
            }
            if (links.isEmpty()) {
                project.getLinks().clear();
            } else {
                project.getLinks().removeIf(link -> !links.contains(link.getLink()));

                for (String link : links) {
                    if (project.getLinks().stream()
                            .noneMatch(actualLink -> actualLink.getLink().equals(link))) {
                        ProjectLink newLink = new ProjectLink();
                        newLink.setLink(link);
                        newLink.setProject(project);
                        project.getLinks().add(newLink);
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

    public ProjectView updateProjectLike(UUID projectId, String clientId) {
        Project project = getProjectByIdOrThrowException(projectId);
        if (project.getLikes() == null) {
            project.setLikes(new HashSet<>());
        }
        if (project.getLikes().contains(clientId)) {
            project.getLikes().remove(clientId);
        } else {
            project.getLikes().add(clientId);
        }

        return projectMapper.projectToProjectView(projectRepository.saveAndFlush(project));
    }

}
