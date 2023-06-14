package com.virginonline.backend.repository;

import com.virginonline.backend.domain.task.Task;
import com.virginonline.backend.domain.user.User;
import java.time.LocalDateTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
  @Query("select t from Task t where t.project.id = :id")
  List<Task> findByProject(Long id);

  @Query("select (count(t) > 0) from Task t where t.title = :title and t.project.title = :project")
  boolean existsByTitle(String title, String project);

    @Query("select distinct t from Task t where t.createdBy.id = :userId or t.assignedTo.id = :userId")
    List<Task> getUserTasks(Long userId);


  @Query("select t from Task t where t.expirationDate between current_time and :endOfWeek")
  List<Task> getTaskByWeek(LocalDateTime endOfWeek);

  @Query("select t from Task t where t.expirationDate between current_time and :endOfMonth")
  List<Task> getTaskByMonth(LocalDateTime endOfMonth);
}
