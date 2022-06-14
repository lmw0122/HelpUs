package com.ssafy.helpus.volunteer.dto;

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

    private Long parentId;

    private String parentName;

    private LocalDateTime createDate;
}
