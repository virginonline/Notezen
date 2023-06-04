package com.virginonline.backend.domain.project;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "ProjectStatus")
@Table(name = "projects_status")
@Getter
@Setter
public class ProjectsStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(name = "title")
    @Enumerated(EnumType.STRING)
    public EProjectStatus status;

}