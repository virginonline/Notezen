package com.virginonline.backend.mapper;

import com.virginonline.backend.domain.Comment;
import com.virginonline.backend.dto.CommentDto;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CommentMapper {

  @Mapping(source = "createdBy.username", target = "author")
  @Mapping(source = "content", target = "content")
  @Mapping(source = "task.id", target = "taskId")
  CommentDto toDto(Comment comment);

  Comment toEntity(CommentDto comment);

  List<CommentDto> toDtoList(List<Comment> projects);

  List<Comment> toEntityList(List<CommentDto> projects);

}
