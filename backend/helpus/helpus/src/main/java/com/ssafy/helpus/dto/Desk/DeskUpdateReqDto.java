package com.ssafy.helpus.dto.Desk;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@ApiModel(value = "고객센터 게시글 수정")
@Getter
public class DeskUpdateReqDto {
    @ApiModelProperty(value = "고객센터 글 고유 번호")
    @NotNull(message = "고객센터 고유번호를 입력해주세요")
    private Long helpDeskId;

    @ApiModelProperty(value = "작성자 고유 번호")
    @NotNull(message = "작성자 고유 번호를 입력해주세요")
    private int memberId;

    @ApiModelProperty(value = "카테고리", example = "문의, 정보수정, 신고, 도움")
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
