package com.ssafy.helpus.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@Table(name = "help_desk_comment")
public class HelpDeskComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id", insertable = false)
    private Long commentId;

    @Column(name = "content")
    private String content;

    @Column(name = "create_date", insertable = false)
    private LocalDateTime createDate;

    @ManyToOne
    @JsonBackReference(value = "comment-member")
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "help_desk_id")
    @JsonBackReference(value = "comment-desk")
    private HelpDesk helpDesk;

    @Builder
    public HelpDeskComment(String content, Member member, HelpDesk helpDesk) {
        this.content = content;
        this.member = member;
        this.helpDesk = helpDesk;
    }
}
