package com.virginonline.backend.service.impl;

import com.virginonline.backend.domain.user.EUserRole;
import com.virginonline.backend.domain.user.User;
import com.virginonline.backend.domain.user.UserRole;
import com.virginonline.backend.dto.BearerToken;
import com.virginonline.backend.dto.LoginDto;
import com.virginonline.backend.dto.RegisterDto;
import com.virginonline.backend.repository.RoleRepository;
import com.virginonline.backend.repository.UserRepository;
import com.virginonline.backend.security.JwtUtilities;
import com.virginonline.backend.service.IUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder ;
    private final JwtUtilities jwtUtilities ;

    @Override
    public String authenticate(LoginDto login) {
        Authentication authentication= authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        login.getUsername(),
                        login.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = userRepository.findByUsername(authentication.getName()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        List<String> rolesNames = new ArrayList<>();
        rolesNames.add(user.getRole().getName().toString());
        return jwtUtilities.generateToken(user.getUsername(), rolesNames);
    }

    @Override
    public ResponseEntity<?> register(RegisterDto register) {
        log.info("Username : {} | password : {}", register.getUsername(), register.getPassword());
        if(userRepository.existsByUsername(register.getUsername())) {
            return new ResponseEntity<>("User is already register", HttpStatus.SEE_OTHER);
        }
        User user = new User();
        UserRole role = roleRepository.findByName(EUserRole.USER).orElseThrow();
        user.setUsername(register.getUsername());
        user.setPassword(passwordEncoder.encode(register.getPassword()));
        user.setRole(role);
        List<String> array = new ArrayList<>();
        array.add(user.getRole().getName().toString());
        String token = jwtUtilities.generateToken(user.getUsername(), array);

        log.info("UserService : Token created : {}", token);
        return new ResponseEntity<>(new BearerToken(token, "Bearer "), HttpStatus.OK);
    }


}