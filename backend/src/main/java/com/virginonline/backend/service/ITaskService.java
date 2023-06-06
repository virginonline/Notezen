package com.virginonline.backend.service;

import com.virginonline.backend.domain.task.Task;
import com.virginonline.backend.dto.TaskDto;

import java.util.List;

public interface ITaskService {
    Task addTask(TaskDto taskDto);
    Task assignTask(Long taskId, String username);
    List<Task> getProjectTasks(Long projectId);
    List<Task> getUserTasks(Long userId);
    Boolean removeTask(Long id);


}
