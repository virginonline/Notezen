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
  @Mapping(source = "expirationDate", target = "expirationDate")
  @Mapping(source = "taskPriority.priority", target = "priority")
  @Mapping(target = "createdDate", ignore = true)
  @Mapping(target = "updatedDate", ignore = true)
  TaskDto toDto(Task task);

  @Mapping(target = "status", ignore = true)
  @Mapping(target = "createdBy", ignore = true)
  @Mapping(target = "project", ignore = true)
  @Mapping(target = "assignedTo", ignore = true)
  @Mapping(target = "taskPriority", ignore = true)
  @Mapping(target = "createdDate", ignore = true)
  @Mapping(target = "updatedDate", ignore = true)
  @Mapping(target = "expirationDate", ignore = true)
  Task toEntity(TaskDto task);

  List<TaskDto> toDtoList(List<Task> tasks);
  List<Task> toEntityList(List<TaskDto> tasks);

  @Named("findTaskStatus")
  default String findTaskStatus(String status) {
    return ETaskStatus.findValue(status).toString();
  }
}
