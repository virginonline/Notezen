package com.virginonline.backend.service.impl;

import com.virginonline.backend.domain.user.Users;
import com.virginonline.backend.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImp implements UserService {
    @Override
    public Users getByUsername(String username) {
        return null;
    }

    @Override
    public Users getById(Long id) {
        return null;
    }

    @Override
    public Users update(Users users) {
        return null;
    }

    @Override
    public Users create(Users users) {
        return null;
    }

    @Override
    public void delete(Users users) {

    }
}
