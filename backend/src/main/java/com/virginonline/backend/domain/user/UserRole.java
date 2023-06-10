package com.virginonline.backend.domain.user;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity(name = "UserRole")
@Table(name = "roles")
public class UserRole implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, length = 50)
    @Enumerated(EnumType.STRING)
    private EUserRole name;

    public Long getId() {
        return id;
    }
    public String getName() {
        return name.toString();
    }

    public void setName(EUserRole name) {
        this.name = name;
    }
}
