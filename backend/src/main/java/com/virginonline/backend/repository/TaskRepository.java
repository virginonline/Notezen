package com.virginonline.backend.repository;

import com.virginonline.backend.domain.task.Task;
import java.time.Instant;
import java.util.Date;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task,Long> {
    @Query("select t from Task t where t.project.id = :id")
    List<Task> findByProject(Long id);

    @Query("select (count(t) > 0) from Task t where t.title = ?1")
    Boolean existsByTitle(String title);

    @Query("select t from Task t where t.createdBy.id = :userId or t.assignedTo.id = :userId")
    List<Task> getUserTasks(Long userId);
    List<Task> getTaskByWeek();
    @Query
    List<Task> getTaskByMonth();

}
