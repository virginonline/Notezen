package com.virginonline.backend.web.security;

import com.virginonline.backend.domain.user.ERole;
import com.virginonline.backend.domain.user.Users;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public final class JwtEntityFactory {

    public static JwtEntity create(Users users) {
        return new JwtEntity(
                users.getId(),
                users.getUsername(),
                users.getName(),
                users.getPassword(),
                mapToGrantedAuthorities(new ArrayList<>(users.getERoles()))
        );
    }

    private static List<GrantedAuthority> mapToGrantedAuthorities(List<ERole> roles) {
        return roles.stream()
                .map(Enum::name)
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

}