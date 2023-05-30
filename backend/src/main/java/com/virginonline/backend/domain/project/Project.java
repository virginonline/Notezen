package com.virginonline.backend.domain.project;

import com.virginonline.backend.domain.AbstractEntity;
import com.virginonline.backend.domain.task.Task;
import com.virginonline.backend.domain.user.User;
import jakarta.persistence.*;

import java.util.List;

@Entity(name = "Project")
@Table(name = "projects")
public class Project extends AbstractEntity {
    private String title;
    private String description;
    @ManyToOne
    @JoinColumn(name = "created_by")
    private User owner;
    @ManyToOne
    @JoinColumn(name = "status")
    private ProjectStatus status;

    @OneToMany
    private List<Task> tasks;
}
