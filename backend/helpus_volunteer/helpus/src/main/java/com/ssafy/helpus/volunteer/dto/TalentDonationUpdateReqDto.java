package com.ssafy.helpus.volunteer.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@ApiModel(value = "재능기부 글 수정")
@Getter
public class TalentDonationUpdateReqDto {

    @ApiModelProperty(value = "물품 기부 글 고유번호")
    @NotNull(message = "물품 기부 글 고유번호를 입력해주세요")
    private Long volunteerId;

    @ApiModelProperty(value = "작성자 고유 번호")
    @NotNull(message = "작성자 고유 번호를 입력해주세요")
    private Long memberId;

    @ApiModelProperty(value = "제목")
    @NotBlank(message = "제목을 입력해주세요")
    private String title;

    @ApiModelProperty(value = "내용")
    @NotBlank(message = "내용을 입력해주세요")
    private String content;
}
