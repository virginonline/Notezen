package com.virginonline.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.time.Instant;

@Data
@Builder
public class UserDto implements Serializable {
  private Long id;
  private String username;
  private String token;
  @JsonProperty("created_date")
  private Instant createdDate;
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private String password;
}
