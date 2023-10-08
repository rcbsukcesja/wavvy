package com.rcbsukcesja.hack2react.controller;

import com.rcbsukcesja.hack2react.model.dto.save.ProjectPatchDto;
import com.rcbsukcesja.hack2react.model.dto.save.ProjectSaveDto;
import com.rcbsukcesja.hack2react.model.dto.view.ProjectView;
import com.rcbsukcesja.hack2react.service.ProjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/projects")
public class ProjectController {
    private final ProjectService projectService;

    @GetMapping
    public ResponseEntity<List<ProjectView>> getAllProjects() {
        return new ResponseEntity<>(projectService.getAllProjects(), HttpStatus.OK);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<ProjectView> getProjectById(@PathVariable UUID projectId) {
        return new ResponseEntity<>(projectService.getProjectById(projectId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ProjectView> createProject(@RequestBody @Valid ProjectSaveDto projectSaveDto) {
        return new ResponseEntity<>(projectService.saveProject(null, projectSaveDto), HttpStatus.CREATED);
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<ProjectView> updateProject(
            @PathVariable UUID projectId,
            @RequestBody @Valid ProjectSaveDto projectSaveDto) {
        return new ResponseEntity<>(projectService.saveProject(projectId, projectSaveDto), HttpStatus.OK);
    }

    @PatchMapping("/{projectId}")
    public ResponseEntity<ProjectView> patchUpdateProject(
            @PathVariable UUID projectId,
            @RequestBody @Valid ProjectPatchDto projectPatchDto) {
        return new ResponseEntity<>(projectService.updateProject(projectId, projectPatchDto), HttpStatus.OK);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<?> deleteProject(@PathVariable UUID projectId) {
        projectService.deleteProject(projectId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
