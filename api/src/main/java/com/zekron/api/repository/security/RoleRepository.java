package com.zekron.api.repository.security;

import com.zekron.api.model.security.ERole;
import com.zekron.api.model.security.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
