package com.virginonline.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@EnableWebSecurity
@Configuration
@EnableMethodSecurity
public class WebSecurityConfig  {
    
}
