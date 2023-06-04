package com.virginonline.backend.mapper;

import com.virginonline.backend.domain.task.Task;
import com.virginonline.backend.dto.TaskDto;
import org.mapstruct.*;

import java.util.List;
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface TaskMapper {
    Task toEntity(TaskDto taskDto);

    TaskDto toDto(Task task);
    List<TaskDto> toDtoList(List<Task> tasks);
    List<Task> toEntityList(List<TaskDto> tasks);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Task partialUpdate(TaskDto taskDto, @MappingTarget Task task);
}