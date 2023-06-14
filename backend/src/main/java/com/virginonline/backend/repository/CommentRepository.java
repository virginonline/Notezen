package com.virginonline.backend.repository;

import com.virginonline.backend.domain.Comment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CommentRepository extends JpaRepository<Comment, Long> {
  @Query("select c from Comment c where c.task.id = :taskId")
  List<Comment> getComment(Long taskId);
}
