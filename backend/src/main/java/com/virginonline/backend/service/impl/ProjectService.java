package com.virginonline.backend.service.impl;

import com.virginonline.backend.domain.project.EProjectStatus;
import com.virginonline.backend.domain.project.Project;
import com.virginonline.backend.domain.project.ProjectsStatus;
import com.virginonline.backend.domain.user.User;
import com.virginonline.backend.dto.ProjectDto;
import com.virginonline.backend.dto.ProjectPreviewDto;
import com.virginonline.backend.exception.ResourceAlreadyExist;
import com.virginonline.backend.mapper.ProjectMapper;
import com.virginonline.backend.repository.ProjectRepository;
import com.virginonline.backend.repository.ProjectStatusRepository;
import com.virginonline.backend.repository.UserRepository;
import com.virginonline.backend.service.IProjectService;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ProjectService implements IProjectService {

  private final UserRepository userRepository;
  private final ProjectStatusRepository projectStatusRepository;
  private final ProjectRepository projectRepository;
  private final ProjectMapper mapper;

  @Override
  public ProjectDto addProject(ProjectDto projectDto) {
    if (projectRepository.existsByTitle(projectDto.getTitle())) {
      throw new ResourceAlreadyExist(
          String.format("Project with %s title already exist", projectDto.getTitle()));
    }
    ProjectsStatus projectsStatus =
        projectStatusRepository.findByStatus(EProjectStatus.findValue(projectDto.getStatus()));
    User user = userRepository.findByUsername(projectDto.getOwner()).orElseThrow();
    Project project = new Project();
    mapper.toDto(project);
    project.setTitle(projectDto.getTitle());
    project.setCreatedDate(Timestamp.from(Instant.now()));
    project.setUpdatedDate(Timestamp.from(Instant.now()));
    project.setDescription(projectDto.getDescription());
    project.setProjectStatus(projectsStatus);
    project.setCreatedBy(user);
    return mapper.toDto(projectRepository.save(project));
  }


  @Override
  public List<ProjectDto> getUserProjects(Long userId) {
    List<ProjectDto> projects = mapper.toDtoList(projectRepository.findByAuthorId(userId));
    log.info("fetched projects : {}", projects);
    return projects;
  }

  @Override
  public Boolean removeProject(Long projectId) {
    if (projectRepository.existsById(projectId)) {
      projectRepository.deleteById(projectId);
      return true;
    }
    return false;
  }

  @Override
  public ProjectDto update(ProjectDto project) {
    Project p = projectRepository.findById(project.getId()).orElseThrow();
    p.setDescription(project.getDescription());
    p.setTitle(project.getTitle());
    return mapper.toDto(projectRepository.save(p));
  }

  @Override
  public List<ProjectPreviewDto> getProjectPreview(Long userId) {
    List<Project> projects = projectRepository.getUserActivityProjects(userId);
    return projects.stream()
        .map(
            project ->
                ProjectPreviewDto.builder()
                    .id(project.getId())
                    .status(project.getProjectStatus().getStatus().toString())
                    .taskCount(projectRepository.countTaskByProject(project))
                    .title(project.getTitle())
                    .build())
        .toList();
  }

  @Override
  public List<ProjectDto> getAuthorProject(Long userId) {
    List<Project> projects = projectRepository.findByAuthor(userId);
    return mapper.toDtoList(projects);
  }
}
