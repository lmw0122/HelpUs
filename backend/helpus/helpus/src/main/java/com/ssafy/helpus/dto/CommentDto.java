package com.ssafy.helpus.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@ApiModel(value = "댓글 등록")
@Getter
public class CommentDto {

    @ApiModelProperty(value = "고객센터 글 고유 번호")
    @NotNull(message = "고객센터 고유번호를 입력해주세요")
    private Long helpDeskId;

    @ApiModelProperty(value = "내용")
    @NotBlank(message = "내용을 입력해주세요")
    private String content;
}
