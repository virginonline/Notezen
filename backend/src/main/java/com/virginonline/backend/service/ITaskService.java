package com.virginonline.backend.service;

import com.virginonline.backend.domain.task.Task;
import com.virginonline.backend.dto.TaskDto;
import com.virginonline.backend.dto.TaskPreviewDto;

import java.util.List;

// TODO
// change return type to DTO
public interface ITaskService {
  TaskDto addTask(TaskDto taskDto);

  TaskDto assignTask(Long taskId, String username);

  List<TaskDto> getProjectTasks(Long projectId);

  List<TaskDto> getUserTasks(Long userId);

  Boolean removeTask(Long id);

  List<TaskPreviewDto> getTaskPreview(Long userId, String filter);

  TaskDto update(TaskDto taskDto);
  TaskDto getTask(Long id);
}
