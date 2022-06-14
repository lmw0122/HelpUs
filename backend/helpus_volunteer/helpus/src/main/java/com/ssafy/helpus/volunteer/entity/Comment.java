package com.ssafy.helpus.volunteer.entity;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "comment")
public class Comment {
    @Id
    @Column(name = "comment_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Column(name = "volunteer_id", nullable = false, updatable = false)
    private Long volunteerId;

    @Column(name = "member_id", nullable = false, updatable = false)
    private Long memberId;

    @Column(name = "comment_group",nullable = false, updatable = false)
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
    public Comment(Long commentId, Long volunteerId, Long memberId, String content, int commentGroup, int depth, Long parentCommentId) {
        this.commentId = commentId;
        this.volunteerId = volunteerId;
        this.memberId = memberId;
        this.content = content;
        this.commentGroup = commentGroup;
        this.depth = depth;
        this.parentCommentId = parentCommentId;
    }
}
