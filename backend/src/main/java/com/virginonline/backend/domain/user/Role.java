package com.virginonline.backend.domain.user;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import org.springframework.data.relational.core.mapping.Table;
import com.virginonline.backend.domain.AbstractEntity;

@Entity
@Table(name = "roles")
public class Role extends AbstractEntity {

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ERole name;
    public Role() {}
    public Role(ERole name) {
        this.name = name;
    }
}
