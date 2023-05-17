package com.virginonline.backend.service.impl;

import com.virginonline.backend.service.AuthService;
import com.virginonline.backend.web.dto.auth.JwtRequest;
import com.virginonline.backend.web.dto.auth.JwtResponse;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    @Override
    public JwtResponse login(JwtRequest loginRequest) {
        return null;
    }

    @Override
    public JwtResponse refresh(String refreshToken) {
        return null;
    }
}
