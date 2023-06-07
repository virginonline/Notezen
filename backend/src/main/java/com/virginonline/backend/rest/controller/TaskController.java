package com.virginonline.backend.rest.controller;

import com.virginonline.backend.domain.task.Task;
import com.virginonline.backend.dto.CommentDto;
import com.virginonline.backend.dto.TaskDto;
import com.virginonline.backend.service.impl.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @GetMapping("/user/{userId}")
    public List<Task> getTasksByUser(@PathVariable("userId") Long id) {
        return taskService.getUserTasks(id);
    }
    @PostMapping
    public Task createTask(@RequestBody TaskDto task) {
        return taskService.addTask(task);
    }

    @GetMapping("/{taskId}/comments")
    public List<CommentDto> getCommentsTask(@PathVariable Long taskId) {
        // TODO
        // return Comments dtos
        return null;
    }
    @PatchMapping
    public TaskDto update(@RequestBody TaskDto task) {
        return null;
    }
    @PatchMapping("/{taskId}")
    public Task assignTo(@PathVariable Long taskId, @RequestParam String username) {
        return taskService.assignTask(taskId, username);
    }

}
