package com.ssafy.helpus.donation.dto.Apply;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@ApiModel(value = "기부 전체 목록")
@Getter
@Builder
public class ApplyAllListResDto {

    @ApiModelProperty(value = "기관명")
    private String orgName;

    @ApiModelProperty(value = "후원자명")
    private String name;

    @ApiModelProperty(value = "기부 물품명")
    private String productName;

    @ApiModelProperty(value = "기부한 수량")
    private int count;

    @ApiModelProperty(value = "기부일")
    private LocalDate donationDate;
}
