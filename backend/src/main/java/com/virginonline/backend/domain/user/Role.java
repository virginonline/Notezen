package com.virginonline.backend.domain.user;

import jakarta.persistence.*;
import lombok.Data;

@Entity(name="Role")
@Table(name = "roles")
@Data
public class Role {
    @Id
    private Long id;
    @Enumerated(EnumType.STRING)
    @Column(name = "name")
    private ERole role;

}
