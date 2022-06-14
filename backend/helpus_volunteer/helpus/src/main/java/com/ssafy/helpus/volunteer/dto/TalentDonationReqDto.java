package com.ssafy.helpus.volunteer.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@ApiModel(value = "재능기부 글 등록")
@Getter
public class TalentDonationReqDto {

    @ApiModelProperty(value = "제목")
    @NotBlank(message = "제목을 입력해주세요")
    private String title;

    @ApiModelProperty(value = "내용")
    @NotBlank(message = "내용을 입력해주세요")
    private String content;

}
