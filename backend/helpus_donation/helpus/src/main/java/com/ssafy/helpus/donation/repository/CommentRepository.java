package com.ssafy.helpus.donation.repository;

import com.ssafy.helpus.donation.entity.Comment;
import com.ssafy.helpus.donation.enumClass.CommentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    Optional<Comment> findTopByBoardIdAndCategoryAndCommentGroupOrderByDepthDesc(Long boardId, CommentStatus category, int group);

    List<Comment> findByBoardIdAndCategoryAndDepthOrderByCommentGroupDesc(Long boardId, CommentStatus category, int depth);
}
