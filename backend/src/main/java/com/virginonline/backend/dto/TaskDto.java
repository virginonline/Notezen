package com.virginonline.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.time.Instant;


@Data
@Builder
public class TaskDto implements Serializable {
   private Long id;
   private String title;
   private String description;
   private String status;
   private String priority;
   @JsonProperty("expiration_date")
   private Instant expirationDate;
   @JsonProperty("created_by")
   private String createdBy;
   @JsonProperty("created_date")
   private Instant createdDate;
   @JsonProperty("updated_date")
   private Instant updatedDate;
   private String project;
   private String assignedTo;
}