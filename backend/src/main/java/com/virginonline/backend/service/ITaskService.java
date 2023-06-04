package com.virginonline.backend.service;

import com.virginonline.backend.dto.TaskDto;

import java.util.List;

public interface ITaskService {
    TaskDto addTask(TaskDto taskDto);
    TaskDto assignTask(String username, TaskDto task);
    List<TaskDto> getProjectTasks(Long projectId);
    List<TaskDto> getUserTasks(Long userId);
    Boolean removeTask(Long id);


}
