package com.ssafy.helpus.donation.dto.Comment;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@ApiModel(value = "댓글 등록")
@Getter
public class CommentReqDto {

    @ApiModelProperty(value = "기부 or 후기 글 고유 번호")
    @NotNull
    private Long boardId;

    @ApiModelProperty(value = "카테고리", example = "donation or confirm")
    @NotBlank(message = "donation or confirm 입력해주세요")
    private String category;

    @ApiModelProperty(value = "내용")
    @NotBlank(message = "내용을 입력해주세요")
    private String content;

    @ApiModelProperty(value = "대댓글인 경우 부모 댓글 번호")
    private Long parentCommentId;
}
