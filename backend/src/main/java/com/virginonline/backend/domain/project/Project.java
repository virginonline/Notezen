package com.virginonline.backend.domain.project;

import com.virginonline.backend.domain.AbstractEntity;
import com.virginonline.backend.domain.user.Users;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import org.springframework.data.relational.core.mapping.Table;


@Entity
@Table(name = "projects")
public class Project extends AbstractEntity {

    private String title;
    private String description;
    @ManyToOne
    @JoinColumn(name = "author_id")
    private Users author;
}
