package com.virginonline.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;

@Data
@Builder(toBuilder = true)
public class TaskPreviewDto {
  private Long id;
  private String title;
  private String project;

  @JsonProperty("expiration_date")
  private LocalDateTime expirationDate;

  private String status;
  private String priority;
}
