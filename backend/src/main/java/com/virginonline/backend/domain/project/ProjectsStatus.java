package com.virginonline.backend.domain.project;

import jakarta.persistence.*;

@Entity(name = "ProjectStatus")
@Table(name = "projects_status")
public class ProjectsStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    public Long getId() {
        return id;
    }
    @Column(name = "title")
    @Enumerated(EnumType.STRING)
    public EProjectStatus status;

    public void setId(Long id) {
        this.id = id;
    }

}