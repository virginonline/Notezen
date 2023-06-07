package com.virginonline.backend.rest.controller;

import com.virginonline.backend.domain.project.Project;
import com.virginonline.backend.dto.ProjectDto;
import com.virginonline.backend.dto.ProjectPreviewDto;
import com.virginonline.backend.service.impl.ProjectService;
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;


    @PostMapping("/new")
    public Project createProject(@RequestBody ProjectDto project) {
       return projectService.addProject(project);
    }
    @GetMapping("/user/{userId}")
    public List<Project> getProjectsByUser(@PathParam("userId") Long id) {
        return projectService.getUserProjects(id);
    }
    @GetMapping("/preview/{userId}")
    public List<ProjectPreviewDto> previewList() {
        return null;
    }
}
