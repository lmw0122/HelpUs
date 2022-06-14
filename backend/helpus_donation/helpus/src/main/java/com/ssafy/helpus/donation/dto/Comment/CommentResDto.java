package com.ssafy.helpus.donation.dto.Comment;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@ApiModel(value = "댓글 목록")
@Getter
@Builder
public class CommentResDto {
    private Long commentId;

    private Long memberId;

    private String name;

    private String profile;

    private String content;

    @ApiModelProperty(value = "대댓글인 경우 부모 댓글 작성자 아이디")
    private Long parentId;

    private String parentName;

    private LocalDateTime createDate;
}
