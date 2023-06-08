package com.virginonline.backend.repository;

import com.virginonline.backend.domain.task.TaskPriority;
import com.virginonline.backend.domain.task.enums.ETaskPriority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskPriorityRepository extends JpaRepository<TaskPriority, Long> {
  TaskPriority findByPriority(ETaskPriority priority);
}
