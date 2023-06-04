package com.virginonline.mapper;

import com.virginonline.backend.domain.project.Project;
import com.virginonline.backend.dto.ProjectDto;
import org.mapstruct.*;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface ProjectMapper {
    Project toEntity(ProjectDto projectDto);
    ProjectDto toDto(Project projectDto);
    @Mapping(source = "createdByUsername", target = "createdBy.username")
    List<Project> toProjectListEntity(List<ProjectDto> projectsDto);
    @Mapping(source = "createdBy.username", target = "owner")
    List<ProjectDto> toProjectListDto(List<Project> projects);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Project partialUpdate(ProjectDto projectDto, @MappingTarget Project project);
}
