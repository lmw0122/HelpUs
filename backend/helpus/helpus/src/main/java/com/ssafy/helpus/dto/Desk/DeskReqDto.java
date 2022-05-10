package com.ssafy.helpus.dto.Desk;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@ApiModel(value = "고객센터 게시글 등록")
@Getter
public class DeskReqDto {

    @ApiModelProperty(value = "카테고리")
    @NotBlank(message = "카테고리를 선택해주세요")
    private String category;

    @ApiModelProperty(value = "제목")
    @NotBlank(message = "제목을 입력해주세요")
    private String title;

    @ApiModelProperty(value = "내용")
    @NotBlank(message = "내용을 입력해주세요")
    private String content;

    @ApiModelProperty(value = "공개여부", example = "공개 or 비공개")
    @NotBlank(message = "공개여부를 선택해주세요")
    private String visible;
}