package com.virginonline.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Data
@Builder(toBuilder = true)
public class ProjectDto implements Serializable {
  private Long id;
  private String title;
  private String description;
  @JsonProperty("tasks")
  private Set<TaskDto> tasks = new LinkedHashSet<>();
  private String status;
  private String owner;

  @JsonProperty("created_date")
  private Timestamp createdDate;

  @JsonProperty("updated_date")
  private Timestamp updatedDate;
}
