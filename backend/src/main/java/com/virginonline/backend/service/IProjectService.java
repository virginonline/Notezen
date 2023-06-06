package com.virginonline.backend.service;

import com.virginonline.backend.domain.project.Project;
import com.virginonline.backend.dto.ProjectDto;

import java.util.List;

public interface IProjectService {
    Project addProject(ProjectDto projectDto);
    List<Project> getUserProjects(Long userId);
    Boolean removeProject(Long projectId);
    ProjectDto update(ProjectDto project);
}
