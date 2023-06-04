package com.virginonline.backend.domain.task;

import com.virginonline.backend.domain.task.enums.ETaskPriority;
import jakarta.persistence.*;

@Entity(name = "TaskPriority")
@Table(name = "priority")
public class TaskPriority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "priority", nullable = false, length = 50)
    @Enumerated(EnumType.STRING)
    private ETaskPriority priority;

    public ETaskPriority getPriority() {
        return priority;
    }

    public void setPriority(ETaskPriority priority) {
        this.priority = priority;
    }
}
