package com.ssafy.helpus.donation.entity;

import com.ssafy.helpus.donation.enumClass.CommentStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor
@Table(name = "comment")
public class Comment {
    @Id @Column(name = "comment_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Column(nullable = false, updatable = false)
    @Enumerated(EnumType.STRING)
    private CommentStatus category;

    @Column(name = "board_id", nullable = false, updatable = false)
    private Long boardId; //물품 기부 글 or 후기 글 고유 번호

    @Column(name = "member_id", nullable = false, updatable = false)
    private Long memberId;

    @Column(name = "comment_group", nullable = false, updatable = false)
    private int commentGroup;

    @Column(updatable = false)
    private int depth;

    @Column(name = "parent_comment_id", updatable = false)
    private Long parentCommentId;

    @Column(nullable = false)
    private String content;

    @Column(name = "create_date", insertable = false, updatable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm")
    private LocalDateTime createDate;

    @Builder
    public Comment(CommentStatus category, Long boardId, Long memberId, String content, int commentGroup, int depth, Long parentCommentId) {
        this.category = category;
        this.boardId = boardId;
        this.memberId = memberId;
        this.content = content;
        this.commentGroup = commentGroup;
        this.depth = depth;
        this.parentCommentId = parentCommentId;
    }
}
