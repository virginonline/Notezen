package com.virginonline.backend.service;

import com.virginonline.backend.domain.user.Users;

public interface UserService {
    Users getByUsername(String username);
    Users getById(Long id);
    Users update(Users users);
    Users create(Users users);
    void delete(Users users);
}
