package com.virginonline.backend.repository;

import com.virginonline.backend.domain.task.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task,Long> {
    @Query("select t from Task t where t.project.id = :id")
    List<Task> findByProject(Long id);
    Boolean existByTitle(String title);
    @Query("select t from Task t where t.createdBy.id = :userId or t.assignedTo.id = :userId")
    List<Task> getUserTasks(Long userId);
}
