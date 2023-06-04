package com.virginonline.backend.repository;

import com.virginonline.backend.domain.task.TaskPriority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskPriorityRepository extends JpaRepository<TaskPriority, Long> {
    TaskPriority findByPriority(String priority);
}
