package com.ssafy.helpus.volunteer.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@ApiModel(value = "봉사 신청 상태")
@Getter
@Builder
public class ApplyStatusRes {

    @ApiModelProperty(value = "봉사 신청 여부")
    private int status;

}
