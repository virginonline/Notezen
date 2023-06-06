package com.virginonline.backend.service.impl;

import com.virginonline.backend.domain.project.EProjectStatus;
import com.virginonline.backend.domain.project.Project;
import com.virginonline.backend.domain.project.ProjectsStatus;
import com.virginonline.backend.domain.user.User;
import com.virginonline.backend.dto.ProjectDto;
import com.virginonline.backend.mapper.ProjectMapper;
import com.virginonline.backend.repository.ProjectRepository;
import com.virginonline.backend.repository.ProjectStatusRepository;
import com.virginonline.backend.repository.UserRepository;
import com.virginonline.backend.service.IProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ProjectService implements IProjectService {

    private final UserRepository userRepository;
    private final ProjectStatusRepository projectStatusRepository;
    private final ProjectRepository projectRepository;
    private final ProjectMapper mapper;

    @Override
    public Project addProject(ProjectDto projectDto) {
        ProjectsStatus projectsStatus = projectStatusRepository.findByStatus(EProjectStatus.findValue(projectDto.getStatus()));
        User user = userRepository.findByUsername(projectDto.getOwner()).orElseThrow();
        Project project = new Project();
        mapper.toDto(project);
        project.setTitle(projectDto.getTitle());
        project.setDescription(projectDto.getDescription());
        project.setProjectStatus(projectsStatus);
        project.setCreatedBy(user);
        return (projectRepository.save(project));
    }

    @Override
    public List<Project> getUserProjects(Long userId) {
        List<Project> projects = projectRepository.findByAuthorId(userId);
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
        return null;
    }
}
