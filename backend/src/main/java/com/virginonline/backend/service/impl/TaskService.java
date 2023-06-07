package com.virginonline.backend.service.impl;

import com.virginonline.backend.domain.project.Project;
import com.virginonline.backend.domain.task.Task;
import com.virginonline.backend.domain.task.TaskPriority;
import com.virginonline.backend.domain.task.TasksStatus;
import com.virginonline.backend.domain.task.enums.ETaskPriority;
import com.virginonline.backend.domain.task.enums.ETaskStatus;
import com.virginonline.backend.domain.user.User;
import com.virginonline.backend.dto.TaskDto;
import com.virginonline.backend.dto.TaskPreviewDto;
import com.virginonline.backend.repository.*;
import com.virginonline.backend.service.ITaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Service
@Transactional
@RequiredArgsConstructor
public class TaskService implements ITaskService {

    private final TaskStatusRepository taskStatusRepository;
    private final TaskPriorityRepository taskPriorityRepository;
    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Override
    public Task addTask(TaskDto taskDto) {
        Task task = new Task();

        User owner = userRepository.findByUsername(taskDto.getCreatedBy()).orElseThrow();
        Project project = projectRepository.findByTitle(taskDto.getProject()).orElseThrow();
        TasksStatus status = taskStatusRepository.findByStatus(ETaskStatus.findValue(taskDto.getStatus()));
        TaskPriority priority = taskPriorityRepository.findByPriority(ETaskPriority.findValue(taskDto.getPriority()));
        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setCreatedBy(owner);
        task.setStatus(status);
        task.setTaskPriority(priority);
        task.setProject(project);

        task.setExpirationDate(taskDto.getExpirationDate());

        return taskRepository.save(task);
    }

    @Override
    public Task assignTask(Long taskId, String username) {
        Task task = taskRepository.findById(taskId).orElseThrow();
        User u = userRepository.findByUsername(username).orElseThrow();
        task.setAssignedTo(u);
        return taskRepository.save(task);
    }

    @Override
    public List<Task> getProjectTasks(Long projectId) {
        return taskRepository.findByProject(projectId);
    }

    @Override
    public List<Task> getUserTasks(Long userId) {
        return taskRepository.getUserTasks(userId);
    }

    @Override
    public Boolean removeTask(Long id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public List<TaskPreviewDto> getTaskPreview(Long userId, String mode) {
        Set<Task> tasks = new HashSet<>();

        //TODO add sort
        // sort between now and end of week
        // sort between now and end of month

        return tasks.stream().map(task ->
                TaskPreviewDto
                        .builder()
                        .id(task.getId())
                        .title(task.getTitle())
                        .expirationDate(task.getExpirationDate())
                        .project(task.getProject().getTitle())
                        .build())
                .collect(Collectors.toList());
    }
}
