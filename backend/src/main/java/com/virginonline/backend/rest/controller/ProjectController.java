package com.virginonline.backend.rest.controller;

import com.virginonline.backend.domain.project.Project;
import com.virginonline.backend.dto.ProjectDto;
import com.virginonline.backend.dto.ProjectPreviewDto;
import com.virginonline.backend.service.impl.ProjectService;
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {

  private final ProjectService projectService;

  @PatchMapping("/edit/{projectId}")
  public ProjectDto update(@PathVariable("projectId") Long id,@RequestBody ProjectDto project) {
    return projectService.update(id,project);
  }
  @PostMapping("/new")
  public ProjectDto createProject(@RequestBody ProjectDto project) {
      return projectService.addProject(project);
  }

  @GetMapping("/by-user/{userId}")
  public List<ProjectDto> getProjectsByUser(@PathVariable("userId") Long userId) {
    return projectService.getUserProjects(userId);
  }
  @GetMapping("/info/{projectId}")
  public ProjectDto getProjectInfo(@PathVariable("projectId") Long projectId) {
      return projectService.getProject(projectId);
  }
  @GetMapping("/author/{userId}")
  public List<ProjectDto> getAuthorProject(@PathVariable("userId") Long id) {
    return projectService.getAuthorProject(id);
  }
  @GetMapping("/preview/{userId}")
  public List<ProjectPreviewDto> previewList(@PathVariable("userId") Long userId) {
    return projectService.getProjectPreview(userId);
  }
  @DeleteMapping("/delete/{projectId}")
  public Boolean deleteProject(@PathVariable("projectId") Long projectId) {
    return projectService.removeProject(projectId);
  }
}
