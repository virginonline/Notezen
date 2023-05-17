package com.virginonline.backend.web.controller;

import com.virginonline.backend.domain.user.Users;
import com.virginonline.backend.service.AuthService;
import com.virginonline.backend.service.UserService;
import com.virginonline.backend.web.dto.auth.JwtRequest;
import com.virginonline.backend.web.dto.auth.JwtResponse;
import com.virginonline.backend.web.dto.user.UserDto;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Validated
@Tag(name = "Auth Controller", description = "Auth API")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    @PostMapping("/login")
    public JwtResponse login(@Validated @RequestBody JwtRequest loginRequest) {
        return authService.login(loginRequest);
    }

    @PostMapping("/register")
    public Users register(@RequestBody UserDto userDto) {
        Users user = new Users();
        Users createdUser = userService.create(user);
        return createdUser;
    }

    @PostMapping("/refresh")
    public JwtResponse refresh(@RequestBody String refreshToken) {
        return authService.refresh(refreshToken);
    }

}
