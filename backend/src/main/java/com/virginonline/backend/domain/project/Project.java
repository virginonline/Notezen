package com.virginonline.backend.domain.project;

import com.virginonline.backend.domain.task.Task;
import com.virginonline.backend.domain.user.User;
import jakarta.persistence.*;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

@Entity(name = "Project")
@Table(name = "projects")
@Getter
@Setter
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false)
    private String description;

    @CreatedDate
    @Column(name = "created_date", nullable = false)
    @CreationTimestamp
    private Timestamp createdDate;

    @LastModifiedDate
    @Column(name = "updated_date")
    private Timestamp  updatedDate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "project_status", nullable = false)
    private ProjectsStatus projectStatus;

    @OneToMany(mappedBy = "project")
    private Set<Task> tasks = new LinkedHashSet<>();

    @PrePersist
    public void toCreate() {
         setCreatedDate(Timestamp.from(Instant.now()));
    }
    @PreUpdate
    public void toUpdate() {
        setUpdatedDate(Timestamp.from(Instant.now()));
    }
}