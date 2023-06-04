package com.virginonline.backend.controller;

import com.virginonline.backend.domain.project.Project;
import com.virginonline.backend.dto.ProjectDto;
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

    @PostMapping
    public ProjectDto createProject(@RequestBody ProjectDto project) {
       return projectService.addProject(project);
    }
    @GetMapping("/user/{userId}")
    public List<ProjectDto> getProjectsByUser(@PathParam("userId") Long id) {
        return projectService.getUserProjects(id);
    }
}
