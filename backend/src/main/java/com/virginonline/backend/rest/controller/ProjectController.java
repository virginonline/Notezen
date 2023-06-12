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

@Slf4j
@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {

  private final ProjectService projectService;

  @PostMapping("/new")
  public ProjectDto createProject(@RequestBody ProjectDto project) {
      log.info("project : {}", project);
      return projectService.addProject(project);
  }

  @GetMapping("/user/{userId}")
  public List<Project> getProjectsByUser(@PathVariable("userId") Long id) {
    return projectService.getUserProjects(id);
  }
  @GetMapping("/author/{userId}")
  public List<ProjectDto> getAuthorProject(@PathVariable("userId") Long id) {
    return projectService.getAuthorProject(id);
  }
  @GetMapping("/preview/{userId}")
  public List<ProjectPreviewDto> previewList(@PathVariable("userId") Long userId) {
    return projectService.getProjectPreview(userId);
  }
}
