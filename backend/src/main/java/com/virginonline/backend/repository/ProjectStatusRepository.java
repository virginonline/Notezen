package com.virginonline.backend.repository;

import com.virginonline.backend.domain.project.ProjectsStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectStatusRepository extends JpaRepository<ProjectsStatus, Long> {
    ProjectsStatus findByTitle(String status);
}

