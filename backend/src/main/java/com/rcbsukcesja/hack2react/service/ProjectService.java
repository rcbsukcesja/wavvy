package com.rcbsukcesja.hack2react.service;

import com.rcbsukcesja.hack2react.model.dto.ProjectDto;
import com.rcbsukcesja.hack2react.model.entity.Project;
import com.rcbsukcesja.hack2react.model.mappers.ProjectMapper;
import com.rcbsukcesja.hack2react.repositories.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;

    public List<ProjectDto> getAllProjects() {
        return projectMapper.projectListToProjectDtoList(projectRepository.findAll());
    }

    public ProjectDto getProjectById(UUID projectId) {
        return projectMapper.projectToProjectDto(projectRepository.getReferenceById(projectId));
    }

    public ProjectDto createProject(ProjectDto projectDto) {
        Project project = projectMapper.projectDtoToProject(projectDto);
        return projectMapper.projectToProjectDto(projectRepository.save(project));
    }

    public void deleteProject(UUID projectId) {
        projectRepository.deleteById(projectId);
    }

}
