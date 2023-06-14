package com.virginonline.backend.rest.controller;

import com.virginonline.backend.dto.CommentDto;
import com.virginonline.backend.dto.TaskDto;
import com.virginonline.backend.dto.TaskPreviewDto;
import com.virginonline.backend.service.impl.TaskService;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

  private final TaskService taskService;
  private final Logger log = LoggerFactory.getLogger(TaskController.class);
  @GetMapping("/by-user/{userId}")
  public List<TaskDto> findTasks(@PathVariable("userId") Long userId) {
    List<TaskDto> tasks = taskService.getUserTasks(userId);

    if(tasks == null) {
      tasks= new ArrayList<>();
      log.info("no tasks for {}", userId);
    }
    log.info("tasks fetched {} for user {}", tasks.size(), userId);
    return tasks;
  }

  @PostMapping("/new")
  public TaskDto createTask(@RequestBody TaskDto task) {
    return taskService.addTask(task);
  }
  @GetMapping("by-project/{projectId}")
  public List<TaskDto> getTasksByProject(@PathVariable Long projectId) {
      return taskService.getProjectTasks(projectId);
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
    return taskService.getComments(taskId);
  }

  @PostMapping("/{taskId}/add-comment")
  public CommentDto addComment(@PathVariable Long taskId, @RequestBody CommentDto commentDto) {
    log.info("Comment {}", commentDto);
    return taskService.addComment(taskId, commentDto);
  }

  //add request param filter
  @GetMapping("/preview/{userId}")
  public List<TaskPreviewDto> previewList(@PathVariable Long userId) {
    return taskService.getTaskPreview(userId);
  }

  @PatchMapping("/delegate/{taskId}")
  public TaskDto assignTo(@PathVariable Long taskId, @RequestParam String username) {
    return taskService.assignTask(taskId, username);
  }
}
