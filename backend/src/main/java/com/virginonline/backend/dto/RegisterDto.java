package com.virginonline.backend.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class RegisterDto implements Serializable {
  private String username;
  private String password;
}
