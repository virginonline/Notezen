package com.virginonline.backend.domain;

import com.virginonline.backend.domain.task.Task;
import com.virginonline.backend.domain.user.User;
import jakarta.persistence.*;

import java.sql.Timestamp;
import java.time.Instant;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "comments")
@Getter
@Setter
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "task", nullable = false)
    private Task task;

    @Column(name = "created_date", nullable = false)
    private Timestamp createdDate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    @Column(name = "content")
    private String content;
}