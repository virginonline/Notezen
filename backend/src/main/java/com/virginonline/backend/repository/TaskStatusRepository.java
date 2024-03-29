package com.virginonline.backend.repository;

import com.virginonline.backend.domain.task.TasksStatus;
import com.virginonline.backend.domain.task.enums.ETaskStatus;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskStatusRepository extends JpaRepository<TasksStatus, Long> {
  Optional<TasksStatus> findByStatus(ETaskStatus status);
}
