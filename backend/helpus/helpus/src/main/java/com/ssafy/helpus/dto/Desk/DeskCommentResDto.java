package com.ssafy.helpus.dto.Desk;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@ApiModel(value = "댓글 조회")
@Getter @Builder
public class DeskCommentResDto {

    @ApiModelProperty(value = "작성자 번호")
    private int memberId;

    @ApiModelProperty(value = "작성자 이름")
    private String name;

    @ApiModelProperty(value = "프로필 사진")
    private String profile;

    @ApiModelProperty(value = "내용")
    private String content;

    @ApiModelProperty(value = "작성일")
    private LocalDateTime createDate;
}
