package com.virginonline.backend.mapper;

import com.virginonline.backend.domain.user.User;
import com.virginonline.backend.dto.UserDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(source = "username", target = "username")
    UserDto toDto(User user);
    User toEntity(UserDto user);
    List<UserDto> toDtoList(List<User> users);
    List<User> toEntityList(List<UserDto> users);

}
