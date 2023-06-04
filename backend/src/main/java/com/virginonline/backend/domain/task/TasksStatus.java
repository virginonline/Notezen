package com.virginonline.backend.domain.task;

import com.virginonline.backend.domain.task.enums.ETaskStatus;
import jakarta.persistence.*;

@Entity(name = "TasksStatus")
@Table(name = "tasks_status")
public class TasksStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "title", nullable = false)
    @Enumerated(EnumType.STRING)
    private ETaskStatus status;

    public ETaskStatus getTitle() {
        return status;
    }

    public void setTitle(ETaskStatus title) {
        this.status = title;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}