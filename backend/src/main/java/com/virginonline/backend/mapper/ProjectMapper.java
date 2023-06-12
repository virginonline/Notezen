package com.virginonline.backend.mapper;

import com.virginonline.backend.domain.project.Project;
import com.virginonline.backend.dto.ProjectDto;
import java.util.List;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface ProjectMapper {
  @Mapping(source = "projectStatus.status", target = "status")
  @Mapping(source = "createdBy.username", target = "owner")
  @Mapping(source = "tasks", target = "tasks", ignore = true)
  ProjectDto toDto(Project project);

  @Mapping(source = "tasks", target = "tasks", ignore = true)
  @Mapping(source = "owner", target = "createdBy", ignore = true)
  Project toEntity(ProjectDto project);
  List<ProjectDto> toDtoList(List<Project> projects);
  List<Project> toEntityList(List<ProjectDto> projects);
}
