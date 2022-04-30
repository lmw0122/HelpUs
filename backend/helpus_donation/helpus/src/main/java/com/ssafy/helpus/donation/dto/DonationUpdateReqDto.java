package com.ssafy.helpus.donation.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@ApiModel(value = "물품 기부 글 수정")
@Getter
public class DonationUpdateReqDto {
    @ApiModelProperty(value = "물품 기부 글 고유번호")
    @NotNull(message = "물품 기부 글 고유번호를 입력해주세요")
    private Integer donationId;

    @ApiModelProperty(value = "제목")
    @NotBlank(message = "제목을 입력해주세요")
    private String title;

    @ApiModelProperty(value = "내용")
    @NotBlank(message = "내용을 입력해주세요")
    private String content;
}
