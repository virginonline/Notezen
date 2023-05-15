package com.virginonline.backend.domain.user;

import java.io.Serializable;
import java.util.Set;

public class User implements Serializable {
    private Long id;
    private String name;
    private String username;
    private String password;
    private String passwordConfirmation;
    private Set<Role> roles;

}
