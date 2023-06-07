package com.virginonline.backend.service;

import com.virginonline.backend.domain.task.Task;
import com.virginonline.backend.dto.TaskDto;
import com.virginonline.backend.dto.TaskPreviewDto;

import java.util.List;

public interface ITaskService {
    Task addTask(TaskDto taskDto);
    Task assignTask(Long taskId, String username);
    List<Task> getProjectTasks(Long projectId);
    List<Task> getUserTasks(Long userId);
    Boolean removeTask(Long id);
    List<TaskPreviewDto> getTaskPreview(Long userId, String mode);


}
