package com.virginonline.backend.rest.controller;

import com.virginonline.backend.domain.task.Task;
import com.virginonline.backend.dto.CommentDto;
import com.virginonline.backend.dto.TaskDto;
import com.virginonline.backend.dto.TaskPreviewDto;
import com.virginonline.backend.service.impl.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

  private final TaskService taskService;

  @GetMapping("/user/{userId}")
  public List<TaskDto> findTasks(@PathVariable("userId") Long id) {
    return taskService.getUserTasks(id);
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public TaskDto createTask(@RequestBody TaskDto task) {
    return taskService.addTask(task);
  }
  @GetMapping("/info/{taskId}")
  public TaskDto getAboutTask(@PathVariable Long taskId) {
      return taskService.getTask(taskId);
  }
  @PatchMapping("/update")
  public TaskDto updateTask(@RequestBody TaskDto taskDto) {
    return taskService.update(taskDto);
  }
  @DeleteMapping("{taskId}")
  public boolean deleteTask(@PathVariable Long taskId) {
    return taskService.removeTask(taskId);
  }
  @GetMapping("/{taskId}/comments")
  public List<CommentDto> getCommentsTask(@PathVariable Long taskId) {
    // TODO
    // return Comments dtos
    return null;
  }

  @GetMapping("/preview/{userId}")
  public List<TaskPreviewDto> previewList(@PathVariable Long userId, @RequestParam String filter) {
    return taskService.getTaskPreview(userId, filter);
  }

  @PatchMapping
  public TaskDto update(@RequestBody TaskDto task) {
    return null;
  }

  @PatchMapping("/{taskId}")
  public TaskDto assignTo(@PathVariable Long taskId, @RequestParam String username) {
    return taskService.assignTask(taskId, username);
  }
}
