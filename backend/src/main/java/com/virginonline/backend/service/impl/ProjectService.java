package com.virginonline.backend.service.impl;

import com.virginonline.backend.domain.project.EProjectStatus;
import com.virginonline.backend.domain.project.Project;
import com.virginonline.backend.domain.project.ProjectsStatus;
import com.virginonline.backend.domain.user.User;
import com.virginonline.backend.dto.ProjectDto;
import com.virginonline.backend.repository.ProjectRepository;
import com.virginonline.backend.repository.ProjectStatusRepository;
import com.virginonline.backend.repository.UserRepository;
import com.virginonline.backend.service.IProjectService;
import com.virginonline.backend.mapper.ProjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ProjectService implements IProjectService {

    private final UserRepository userRepository;
    private final ProjectStatusRepository projectStatusRepository;
    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;
    @Override
    public ProjectDto addProject(ProjectDto projectDto) {
        ProjectsStatus projectsStatus = projectStatusRepository.findByStatus(EProjectStatus.findValue(projectDto.getStatus()));
        User user = userRepository.findByUsername(projectDto.getOwner()).orElseThrow();
        Project project = projectMapper.toEntity(projectDto);
        project.setProjectStatus(projectsStatus);
        project.setCreatedBy(user);
        return projectMapper.toDto(projectRepository.save(project));
    }

    @Override
    public List<ProjectDto> getUserProjects(Long userId) {
        List<Project> projects = projectRepository.findByAuthorId(userId);
        return projectMapper.toProjectListDto(projects);
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
        return projectMapper.toDto(projectRepository.save(projectMapper.toEntity(project)));
    }
}
