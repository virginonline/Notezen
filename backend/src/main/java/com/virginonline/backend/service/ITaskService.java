package com.virginonline.backend.service;

import com.virginonline.backend.domain.task.Task;
import com.virginonline.backend.dto.CommentDto;
import com.virginonline.backend.dto.TaskDto;
import com.virginonline.backend.dto.TaskPreviewDto;

import java.util.List;

public interface ITaskService {
  TaskDto addTask(TaskDto taskDto);
  CommentDto addComment(Long taskId, CommentDto commentDto);
  List<CommentDto> getComments(Long taskId);
  TaskDto assignTask(Long taskId, String username);

  List<TaskDto> getProjectTasks(Long projectId);

  List<TaskDto> getUserTasks(Long userId);

  Boolean removeTask(Long id);

  List<TaskPreviewDto> getTaskPreview(Long userId);

  TaskDto update(TaskDto taskDto);
  TaskDto getTask(Long id);
}
