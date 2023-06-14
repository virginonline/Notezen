package com.virginonline.backend.repository;

import com.virginonline.backend.domain.task.TaskPriority;
import com.virginonline.backend.domain.task.enums.ETaskPriority;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskPriorityRepository extends JpaRepository<TaskPriority, Long> {
  Optional<TaskPriority> findByPriority(ETaskPriority priority);
}
