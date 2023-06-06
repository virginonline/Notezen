package com.virginonline.backend.service;

import com.virginonline.backend.dto.LoginDto;
import com.virginonline.backend.dto.RegisterDto;
import org.springframework.http.ResponseEntity;

public interface IUserService {
    String authenticate(LoginDto login);
    ResponseEntity<?> register (RegisterDto register);

}
