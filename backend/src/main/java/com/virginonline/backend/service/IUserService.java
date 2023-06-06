package com.virginonline.backend.service;

import com.virginonline.backend.dto.LoginDto;
import com.virginonline.backend.dto.RegisterDto;
import com.virginonline.backend.dto.UserDto;
import org.springframework.http.ResponseEntity;

public interface IUserService {
    UserDto authenticate(LoginDto login);
    ResponseEntity<?> register (RegisterDto register);

}
