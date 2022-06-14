package com.ssafy.helpus.volunteer.repository;

import com.ssafy.helpus.volunteer.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    Optional<Comment> findByParentCommentId(Long parentCommentId);

    List<Comment> findByVolunteerIdOrderByCommentGroupDesc(Long volunteerId);

    Page<Comment> findByVolunteerIdOrderByCommentGroupDescDepth(Long volunteerId, Pageable pageable);


}
