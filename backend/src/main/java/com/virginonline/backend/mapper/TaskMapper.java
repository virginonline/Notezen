package com.virginonline.backend.mapper;

import com.virginonline.backend.domain.task.Task;
import com.virginonline.backend.domain.task.TasksStatus;
import com.virginonline.backend.domain.task.enums.ETaskStatus;
import com.virginonline.backend.dto.TaskDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TaskMapper {

  @Mapping(source = "assignedTo.username", target = "assignedTo")
  @Mapping(source = "status.title", target = "status", qualifiedByName = "findTaskStatus")
  @Mapping(source = "createdBy.username", target = "createdBy")
  @Mapping(source = "project.title", target = "project")
  @Mapping(source = "taskPriority.priority", target = "priority")
  TaskDto toDto(Task task);

  @Mapping(source = "status", target = "status", ignore = true)
  @Mapping(source = "createdBy", target = "createdBy", ignore = true)
  @Mapping(source = "project", target = "project", ignore = true)
  @Mapping(source = "assignedTo", target = "assignedTo", ignore = true)
  @Mapping(source = "priority", target = "taskPriority", ignore = true)
  Task toEntity(TaskDto task);

  List<TaskDto> toDtoList(List<Task> tasks);

  @Named("findTaskStatus")
  default String findTaskStatus(String status) {
    return ETaskStatus.findValue(status).toString();
  }
}
