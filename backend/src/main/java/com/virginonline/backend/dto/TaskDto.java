package com.virginonline.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TaskDto implements Serializable {
  private Long id;
  private String title;
  private String description;
  private String status;
  private String priority;

  @JsonProperty("expiration_date")
  private LocalDateTime expirationDate;

  @JsonProperty("created_by")
  private String createdBy;

  @JsonProperty("created_date")
  private Instant createdDate;

  @JsonProperty("updated_date")
  private Instant updatedDate;

  private String project;
  private String assignedTo;
}
