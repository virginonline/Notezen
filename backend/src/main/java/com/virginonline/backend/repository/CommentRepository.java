package com.virginonline.backend.repository;

import com.virginonline.backend.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface CommentRepository extends JpaRepository<Comment,Long> {

}
