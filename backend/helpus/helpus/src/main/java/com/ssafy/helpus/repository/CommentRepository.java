package com.ssafy.helpus.repository;

import com.ssafy.helpus.model.HelpDeskComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<HelpDeskComment, Long> {
}
