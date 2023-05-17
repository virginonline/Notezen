package com.virginonline.backend.service;

import com.virginonline.backend.web.dto.auth.JwtRequest;
import com.virginonline.backend.web.dto.auth.JwtResponse;

public interface AuthService {
    JwtResponse login(JwtRequest loginRequest);

    JwtResponse refresh(String refreshToken);
}
