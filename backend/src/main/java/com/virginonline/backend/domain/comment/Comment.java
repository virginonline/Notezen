package com.virginonline.backend.domain.comment;

import com.virginonline.backend.domain.AbstractEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity(name = "Comment")
@Table(name = "comments")
public class Comment extends AbstractEntity {
    @Column(columnDefinition = "jsonb")
    private String content;
}
