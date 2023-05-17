package com.virginonline.backend.domain.user;

import com.virginonline.backend.domain.AbstractEntity;
import jakarta.persistence.Entity;
import org.springframework.data.relational.core.mapping.Table;
import lombok.*;

import java.util.Set;

@Entity
@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class Users extends AbstractEntity {
    private String name;
    private String username;
    private String password;
    private String passwordConfirmation;
    private Set<ERole> ERoles;

}
