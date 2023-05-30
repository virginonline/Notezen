package com.virginonline.backend.domain.project;

import jakarta.persistence.*;
import org.yaml.snakeyaml.events.Event;

@Entity(name = "ProjectStatus")
@Table(name = "projects_status")
public class ProjectStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @Enumerated(EnumType.STRING)
    @Column(name = "title")
    private EProjectStatus projectStatus;
}
