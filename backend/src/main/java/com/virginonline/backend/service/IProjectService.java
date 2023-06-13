package com.virginonline.backend.service;

import com.virginonline.backend.domain.project.Project;
import com.virginonline.backend.dto.ProjectDto;
import com.virginonline.backend.dto.ProjectPreviewDto;

import java.util.List;

// TODO
// change return type to DTO
public interface IProjectService {
  ProjectDto addProject(ProjectDto projectDto);

  List<ProjectDto> getUserProjects(Long userId);

  Boolean removeProject(Long projectId);

  ProjectDto update(ProjectDto project);

  List<ProjectPreviewDto> getProjectPreview(Long userId);
  List<ProjectDto> getAuthorProject(Long userId);
}
