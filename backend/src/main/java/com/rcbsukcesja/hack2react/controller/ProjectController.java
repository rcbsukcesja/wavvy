package com.rcbsukcesja.hack2react.controller;

import com.rcbsukcesja.hack2react.model.dto.save.ProjectPatchDto;
import com.rcbsukcesja.hack2react.model.dto.save.ProjectSaveDto;
import com.rcbsukcesja.hack2react.model.dto.view.ProjectView;
import com.rcbsukcesja.hack2react.model.enums.ProjectStatus;
import com.rcbsukcesja.hack2react.service.ProjectService;
import com.rcbsukcesja.hack2react.service.StorageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/projects")
public class ProjectController {
    private final ProjectService projectService;
    private final StorageService storageService;

    @GetMapping
    public ResponseEntity<Page<ProjectView>> getAllProjects(
            @RequestParam(required = false) List<String> statusList,
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate,
            Pageable pageable) {
        List<ProjectStatus> projectStatusList = statusList == null ? null : statusList.stream()
                .map(ProjectStatus::getByName)
                .toList();
        return new ResponseEntity<>(projectService.getAllProjects(projectStatusList, startDate, endDate, pageable), HttpStatus.OK);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<ProjectView> getProjectById(@PathVariable UUID projectId) {
        return new ResponseEntity<>(projectService.getProjectById(projectId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ProjectView> createProject(@RequestBody @Valid ProjectSaveDto projectSaveDto) {
        return new ResponseEntity<>(projectService.createProject(projectSaveDto), HttpStatus.CREATED);
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<ProjectView> updateProject(
            @PathVariable UUID projectId,
            @RequestBody @Valid ProjectSaveDto projectSaveDto) {
        return new ResponseEntity<>(projectService.putUpdateProject(projectId, projectSaveDto), HttpStatus.OK);
    }

    @PatchMapping("/{projectId}")
    public ResponseEntity<ProjectView> patchUpdateProject(
            @PathVariable UUID projectId,
            @RequestBody @Valid ProjectPatchDto projectPatchDto) {
        return new ResponseEntity<>(projectService.patchUpdateProject(projectId, projectPatchDto), HttpStatus.OK);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<?> deleteProject(@PathVariable UUID projectId) {
        projectService.deleteProject(projectId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{id}/image")
    public ResponseEntity<?> uploadLogo(
            @PathVariable UUID id,
            @RequestParam("file") MultipartFile file) {
        storageService.store(file, id.toString(), "image");
        String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename());
        projectService.updateImagePath(fileExtension, id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}/image")
    public ResponseEntity<?> removeLogo(
            @PathVariable UUID id) {
        String filePath = projectService.removeImagePath(id);
        if (filePath != null) {
            storageService.remove(filePath);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
