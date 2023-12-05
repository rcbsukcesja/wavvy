package com.rcbsukcesja.hack2react.service;

import com.rcbsukcesja.hack2react.exceptions.badrequest.InvalidProjectStatusException;
import com.rcbsukcesja.hack2react.exceptions.badrequest.ReasonValueException;
import com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages;
import com.rcbsukcesja.hack2react.exceptions.messages.ForbiddenErrorMessageResources;
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
import com.rcbsukcesja.hack2react.utils.AuthenticationUtils;
import com.rcbsukcesja.hack2react.utils.FileUtils;
import com.rcbsukcesja.hack2react.utils.TimeUtils;
import com.rcbsukcesja.hack2react.utils.TokenUtils;
import com.rcbsukcesja.hack2react.validations.DateValidation;
import com.rcbsukcesja.hack2react.validations.OrganizationValidation;
import com.rcbsukcesja.hack2react.validations.UserValidation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectMapper projectMapper;
    private final ProjectRepository projectRepository;
    private final OrganizationNGORepository organizationNGORepository;
    private final DateValidation dateValidation;
    private final AddressMapper addressMapper;
    private final UserValidation userValidation;
    private final OrganizationValidation organizationValidation;

    @Value("${wavvy.images.project.url}")
    private String projectUrl;

    public Page<ProjectView> getAllProjects(String search, Set<ProjectStatus> statuses, LocalDate startDate,
                                            LocalDate endDate, Pageable pageable, Authentication authentication) {
        statuses = setProjectStatuses(statuses, authentication);
        checkProjectStatuses(statuses, authentication);

        dateValidation.isStartDateBeforeOrEqualEndDate(startDate, endDate);
        Specification<Project> spec = ProjectSpecifications.notOutsideDateRange(startDate, endDate);

        if (authentication == null || !AuthenticationUtils.hasRole(authentication, "ROLE_CITY_HALL")) {
            spec = spec.and(ProjectSpecifications.isNotDisabled());
        }

        if (search != null && !search.isEmpty()) {
            spec = spec.and(ProjectSpecifications.nameOrTagsContain(search));
        }
        if (statuses != null && !statuses.isEmpty()) {
            spec = spec.and(ProjectSpecifications.statusInStatusList(statuses));
        }
        return projectRepository.findAll(spec, pageable).map(projectMapper::projectToProjectView);
    }

    public Page<ProjectView> getMyProjects(String search, Set<ProjectStatus> statuses, LocalDate startDate,
                                           LocalDate endDate, Pageable pageable, Authentication authentication) {

        OrganizationNGO ngo = getNgoByOwnerIdOrThrowException(TokenUtils.getUserId(authentication));
        statuses = setProjectStatuses(statuses, authentication);
        checkProjectStatuses(statuses, authentication);

        dateValidation.isStartDateBeforeOrEqualEndDate(startDate, endDate);
        Specification<Project> spec = ProjectSpecifications.notOutsideDateRange(startDate, endDate);

        spec = spec.and(ProjectSpecifications.isOrganizedBy(ngo));

        if (search != null && !search.isEmpty()) {
            spec = spec.and(ProjectSpecifications.nameOrTagsContain(search));
        }
        if (statuses != null && !statuses.isEmpty()) {
            spec = spec.and(ProjectSpecifications.statusInStatusList(statuses));
        }
        return projectRepository.findAll(spec, pageable).map(projectMapper::projectToProjectView);
    }

    public ProjectView getProjectById(UUID projectId) {
        return projectMapper.projectToProjectView(getProjectByIdOrThrowException(projectId));
    }

    @Transactional
    public ProjectView createProject(ProjectSaveDto dto) {
        organizationValidation.checkIfNotDisabledOrUnconfirmed(getNgoByOwnerIdOrThrowException(TokenUtils
                .getUserId(SecurityContextHolder.getContext().getAuthentication())));
        Project project = new Project();

        setBasicProjectFields(dto, project);
        project.setTags(new HashSet<>());
        project.setLinks(new HashSet<>());
        project.setDisabled(false);

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
        }

        return projectMapper.projectToProjectView(projectRepository.saveAndFlush(project));
    }

    @Transactional
    public ProjectView putUpdateProject(UUID projectId, ProjectSaveDto dto) {
        Project project = getProjectByIdOrThrowException(projectId);
        userValidation.checkIfIsOwner(project.getOrganizer().getOwner().getId());

        setBasicProjectFields(dto, project);

        if (dto.disabled() != null) {
            AuthenticationUtils.checkIfCityUser(SecurityContextHolder.getContext().getAuthentication(),
                    ForbiddenErrorMessageResources.DISABLED);
            if (dto.disabled()) {
                if (dto.reason() == null) {
                    throw new ReasonValueException(ErrorMessages.REASON_MUST_NOT_BE_NULL);
                }
            }
            project.setDisabled(dto.disabled());
        }
        if (dto.reason() != null && !dto.reason().equals(project.getReason())) {
            AuthenticationUtils.checkIfCityUser(SecurityContextHolder.getContext().getAuthentication(),
                    ForbiddenErrorMessageResources.REASON);
            project.setReason(dto.reason());
        }

        updateTags(project, dto.tags());
        updateLinks(project, dto.links());

        project.setUpdatedAt(TimeUtils.nowInUTC());

        return projectMapper.projectToProjectView(projectRepository.saveAndFlush(project));
    }

    @Transactional
    public ProjectView patchUpdateProject(UUID projectId, ProjectPatchDto dto) {
        Project project = getProjectByIdOrThrowException(projectId);
        if(!AuthenticationUtils.isCityUser(SecurityContextHolder.getContext().getAuthentication())){
            userValidation.checkIfIsOwner(project.getOrganizer().getOwner().getId());
        }
        if (dto.name() != null && !dto.name().equals(project.getName())) {
            project.setName(dto.name());
        }
        if (dto.description() != null && !dto.description().equals(project.getDescription())) {
            project.setDescription(dto.description());
        }
        if (dto.address() != null && !addressMapper.projectAddressPatchDtoToAddress(dto.address()).equals(project.getAddress())) {
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
        if (dto.status() != null && !dto.status().equals(project.getStatus())) {
            project.setStatus(dto.status());
        }
        if (dto.possibleVolunteer() != project.isPossibleVolunteer()) {
            project.setPossibleVolunteer(dto.possibleVolunteer());
        }
        if (dto.disabled() != null) {
            AuthenticationUtils.checkIfCityUser(SecurityContextHolder.getContext().getAuthentication(),
                    ForbiddenErrorMessageResources.DISABLED);
            if (dto.disabled()) {
                if (dto.reason() == null) {
                    throw new ReasonValueException(ErrorMessages.REASON_MUST_NOT_BE_NULL);
                }
            }
            project.setDisabled(dto.disabled());
        }
        if (dto.reason() != null && !dto.reason().equals(project.getReason())) {
            AuthenticationUtils.checkIfCityUser(SecurityContextHolder.getContext().getAuthentication(),
                    ForbiddenErrorMessageResources.REASON);
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
        userValidation.checkIfIsOwner(project.getOrganizer().getOwner().getId());
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
        project.setOrganizer(getNgoByOwnerIdOrThrowException(TokenUtils.getUserId(SecurityContextHolder.getContext().getAuthentication())));
    }

    private void updateTags(Project project, Set<String> tags) {
        if (tags != null) {
            if (project.getTags() == null) {
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
            if (project.getLinks() == null) {
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

    private OrganizationNGO getNgoByOwnerIdOrThrowException(UUID userId) {
        return organizationNGORepository.getOrganizationNGOByOwner_Id(userId)
                .orElseThrow(() -> new OrganizationNGONotFoundException(
                        ErrorMessages.ORGANIZATION_NGO_BY_OWNER_ID_NOT_FOUND, userId));
    }

    public ProjectView updateProjectLike(UUID projectId, String clientId) {
        Project project = getProjectByIdOrThrowException(projectId);

        if (project.getLikes().contains(clientId)) {
            project.getLikes().remove(clientId);
        } else {
            project.getLikes().add(clientId);
        }

        return projectMapper.projectToProjectView(projectRepository.saveAndFlush(project));
    }

    private static Set<ProjectStatus> setProjectStatuses(Set<ProjectStatus> projectStatuses, Authentication authentication) {
        if (projectStatuses == null || projectStatuses.isEmpty()) {
            if (authentication == null) {
                projectStatuses = ProjectStatus.getAllowedProjectStatuses(ProjectStatus.projectStatusesNotPublic());
            } else {
                projectStatuses = Arrays.stream(ProjectStatus.values()).collect(Collectors.toSet());
            }
        }
        return projectStatuses;
    }

    private static void checkProjectStatuses(Set<ProjectStatus> projectStatuses, Authentication authentication) {
        if (authentication == null) {
            if (ProjectStatus.isProjectStatusNotAllowed(projectStatuses, ProjectStatus.projectStatusesNotPublic())) {
                throw new InvalidProjectStatusException(ErrorMessages.INVALID_PROJECT_STATUS);
            }
        }
    }

}
