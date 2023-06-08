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
import com.virginonline.backend.mapper.TaskMapper;
import com.virginonline.backend.repository.ProjectRepository;
import com.virginonline.backend.repository.TaskPriorityRepository;
import com.virginonline.backend.repository.TaskRepository;
import com.virginonline.backend.repository.TaskStatusRepository;
import com.virginonline.backend.repository.UserRepository;
import com.virginonline.backend.service.ITaskService;
import java.sql.Timestamp;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


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
    public Task addTask(TaskDto taskDto) {
        if(taskRepository.existsByTitle(taskDto.getTitle(), taskDto.getProject())) {
            return null;
        }
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

        task.setExpirationDate(Timestamp.valueOf(taskDto.getExpirationDate()));

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
    public TaskDto update(TaskDto taskDto) {
        Task t = taskRepository.findById(taskDto.getId()).orElseThrow();
        TaskPriority taskPriority = taskPriorityRepository.findByPriority(ETaskPriority.findValue(taskDto.getPriority()));
        TasksStatus tasksStatus = taskStatusRepository.findByStatus(ETaskStatus.findValue(taskDto.getStatus()));

        t.setDescription(taskDto.getDescription());
        t.setTitle(taskDto.getTitle());
        t.setTaskPriority(taskPriority);
        t.setStatus(tasksStatus);

        return taskMapper.toDto(taskRepository.save(t));
    }
    @Override
    public List<TaskPreviewDto> getTaskPreview(Long userId, String filter) {
        LocalDateTime now = LocalDateTime.now();
        List<Task> tasks;
        if (filter.equals("WEEK")) {
            tasks = taskRepository.getTaskByWeek(
                now.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY)));
        } else {
            tasks = taskRepository.getTaskByMonth(
                now.withDayOfMonth(now.getDayOfMonth()));
        }
        return tasks.stream().map(task ->
                TaskPreviewDto
                        .builder()
                        .id(task.getId())
                        .title(task.getTitle())
                        .expirationDate(task.getExpirationDate().toLocalDateTime())
                        .project(task.getProject().getTitle())
                        .build())
                .collect(Collectors.toList());
    }

}
