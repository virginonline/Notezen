package com.virginonline.backend.repository;

import com.virginonline.backend.domain.project.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project,Long> {
    Optional<Project> findByTitle(String title);

    @Query("select p from Project p where p.createdBy.id = :id")
    List<Project> findByAuthorId(Long id);
    @Query("select count (t) from Task t where t.project =:project")
    Long countTaskByProject(Project project);
    @Query("select p from Project p inner join Task t on t.project=p where t.createdBy.id=:userId or t.assignedTo=:userId or p.createdBy=:userId")
    List<Project> getUserActivityProjects(Long userId);
    Boolean existsByTitle(String title);
}
