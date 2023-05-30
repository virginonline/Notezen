package com.virginonline.backend.security;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;

public class JwtUtilities {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long expiration;

    private String extractUsername(String token) {
        return "";
    }
    public String getToken(HttpServletRequest request) {
        return null;
    }
}
