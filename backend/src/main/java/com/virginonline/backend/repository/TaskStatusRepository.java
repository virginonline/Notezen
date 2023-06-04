package com.virginonline.backend.repository;

import com.virginonline.backend.domain.task.TasksStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskStatusRepository extends JpaRepository<TasksStatus, Long> {
    TasksStatus findByTitle(String title);
}
