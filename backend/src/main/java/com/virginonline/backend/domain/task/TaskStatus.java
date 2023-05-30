package com.virginonline.backend.domain.task;

import jakarta.persistence.*;
import lombok.Data;

@Entity(name = "TaskStatus")
@Table(name = "task_status")
@Data
public class TaskStatus  {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @Enumerated(EnumType.STRING)
    @Column(name = "title")
    private ETaskStatus status;
}
