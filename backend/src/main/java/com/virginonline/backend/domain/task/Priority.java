package com.virginonline.backend.domain.task;

import com.virginonline.backend.domain.AbstractEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.relational.core.mapping.Table;

@Entity
@Table(name = "task_priority")
@AllArgsConstructor
@NoArgsConstructor
public class Priority extends AbstractEntity {
    @Enumerated(EnumType.STRING)
    private EPriority name;
}
