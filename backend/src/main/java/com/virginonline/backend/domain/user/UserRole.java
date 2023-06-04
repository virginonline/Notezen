package com.virginonline.backend.domain.user;

import jakarta.persistence.*;

@Entity(name = "UserRole")
@Table(name = "roles")
public class UserRole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, length = 50)
    @Enumerated(EnumType.STRING)
    private EUserRole name;

    public Long getId() {
        return id;
    }
    public EUserRole getName() {
        return name;
    }

    public void setName(EUserRole name) {
        this.name = name;
    }
}
