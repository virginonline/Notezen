package com.virginonline.backend.controller;

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
    public List<TaskDto> getTasksByUser(@PathVariable("userId") Long id) {
        return taskService.getUserTasks(id);
    }
    @PostMapping
    public TaskDto createTask(@RequestBody TaskDto task) {
        return taskService.addTask(task);
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
