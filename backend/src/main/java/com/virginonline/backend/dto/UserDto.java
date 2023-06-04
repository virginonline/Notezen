package com.virginonline.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.Instant;

@Data
public class UserDto {
    private String username;

    @JsonProperty("created_date")
    private Instant createdDate;


}
