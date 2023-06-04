package com.virginonline.backend.service;

import com.virginonline.backend.dto.ProjectDto;

import java.util.List;

public interface IProjectService {
    ProjectDto addProject(ProjectDto projectDto);
    List<ProjectDto> getUserProjects(Long userId);
    Boolean removeProject(Long projectId);
    ProjectDto update(ProjectDto project);
}
