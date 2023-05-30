package com.virginonline.backend.domain.task;

import com.virginonline.backend.domain.AbstractEntity;
import com.virginonline.backend.domain.project.Project;
import com.virginonline.backend.domain.user.User;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;
import java.util.Set;

@Entity(name = "Task")
@Table(name = "tasks")
@Data
@NoArgsConstructor
public class Task extends AbstractEntity {
    private String title;
    private String description;
    @ManyToOne
    @JoinColumn(name = "priority")
    private TaskPriority priority;
    @ManyToOne
    @JoinColumn(name = "status")
    private TaskStatus status;
    @Column(name = "expiration_date")
    private Instant expirationDate;
    @ManyToOne
    @JoinColumn(name = "created_by")
    private User author;

    @ManyToMany
    private Set<User> assignedTo;

    @ManyToOne
    private Project project;
}
