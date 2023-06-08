package com.virginonline.backend.repository;

import com.virginonline.backend.domain.user.EUserRole;
import com.virginonline.backend.domain.user.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<UserRole, Long> {
  Optional<UserRole> findByName(EUserRole name);
}
