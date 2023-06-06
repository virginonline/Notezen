package com.virginonline.backend.controller;

import com.virginonline.backend.dto.LoginDto;
import com.virginonline.backend.dto.RegisterDto;
import com.virginonline.backend.dto.UserDto;
import com.virginonline.backend.service.impl.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;

    @PostMapping("/login")
    public UserDto login(@RequestBody LoginDto login) {
       return userService.authenticate(login);
    }
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDto registerDto) {
        return userService.register(registerDto);
    }
}
