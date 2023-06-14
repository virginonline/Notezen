package com.virginonline.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.time.Instant;

@Data
@Builder
public class CommentDto implements Serializable {
  private Long id;
  private String author;
  private Long taskId;
  private String content;
  @JsonProperty("created_at")
  private Instant createdDate;
}
