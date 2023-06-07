package com.virginonline.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder(toBuilder = true)
public class ProjectPreviewDto {
    private Long id;
    private String title;
    @JsonProperty("task_count")
    private String taskCount;
}
