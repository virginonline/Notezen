package com.virginonline.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Data
@Builder(toBuilder = true)
public class TaskPreviewDto {
    private Long id;
    private String title;
    private String project;
    @JsonProperty("expiration_date")
    private Instant expirationDate;
}
