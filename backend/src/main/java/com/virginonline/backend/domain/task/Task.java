package com.virginonline.backend.domain.task;

import com.virginonline.backend.domain.AbstractEntity;
import com.virginonline.backend.domain.user.Users;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.relational.core.mapping.Table;

import java.time.Instant;

@Entity
@Table(name = "tasks")
@Getter
@Setter
public class Task extends AbstractEntity {

    private String title;
    private String description;

    @ManyToOne
    @JoinColumn(name = "priority_id")
    private Priority priority;
    @ManyToOne
    @JoinColumn(name = "status_id")
    private Status status;
    private Instant dueDate;

    @ManyToOne
    @JoinColumn(name = "created_by")
    private Users createdBy;

}
