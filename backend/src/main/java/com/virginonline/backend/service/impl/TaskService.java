package com.virginonline.backend.service.impl;

import com.virginonline.backend.domain.project.Project;
import com.virginonline.backend.domain.task.Task;
import com.virginonline.backend.domain.task.TaskPriority;
import com.virginonline.backend.domain.task.TasksStatus;
import com.virginonline.backend.domain.task.enums.ETaskPriority;
import com.virginonline.backend.domain.task.enums.ETaskStatus;
import com.virginonline.backend.domain.user.User;
import com.virginonline.backend.dto.TaskDto;
import com.virginonline.backend.repository.*;
import com.virginonline.backend.service.ITaskService;
import com.virginonline.backend.mapper.TaskMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TaskService implements ITaskService {

    private final TaskStatusRepository taskStatusRepository;
    private final TaskPriorityRepository taskPriorityRepository;
    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final TaskMapper taskMapper;
    @Override
    public TaskDto addTask(TaskDto taskDto) {
        if(taskRepository.existByTitle(taskDto.getTitle())) {
            return null;
        }
        Task task = taskMapper.toEntity(taskDto);

        User owner = userRepository.findByUsername(taskDto.getCreatedBy()).orElseThrow();
        Project project = projectRepository.findByTitle(taskDto.getProject()).orElseThrow();
        TasksStatus status = taskStatusRepository.findByStatus(ETaskStatus.findValue(taskDto.getStatus()));
        TaskPriority priority = taskPriorityRepository.findByPriority(ETaskPriority.findValue(taskDto.getPriority()));

        task.setCreatedBy(owner);
        task.setStatus(status);
        task.setTaskPriority(priority);
        task.setProject(project);

        task.setExpirationDate(taskDto.getExpirationDate());

        return taskMapper.toDto(taskRepository.save(task));
    }

    @Override
    public TaskDto assignTask(Long taskId, String username) {
        Task task = taskRepository.findById(taskId).orElseThrow();
        User u = userRepository.findByUsername(username).orElseThrow();
        task.setAssignedTo(u);
        return taskMapper.toDto(taskRepository.save(task));
    }

    @Override
    public List<TaskDto> getProjectTasks(Long projectId) {
        List<TaskDto> tasks = taskMapper.toDtoList(taskRepository.findByProject(projectId));
        return tasks;
    }

    @Override
    public List<TaskDto> getUserTasks(Long userId) {
        return taskMapper.toDtoList(taskRepository.getUserTasks(userId));
    }

    @Override
    public Boolean removeTask(Long id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
