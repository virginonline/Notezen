package com.virginonline.backend.domain.task;

import jakarta.persistence.*;
import lombok.Data;

@Entity(name="TaskPriority")
@Table(name = "task_priority")
@Data
public class TaskPriority {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @Enumerated(EnumType.STRING)
    private ETaskPriority priority;
}
