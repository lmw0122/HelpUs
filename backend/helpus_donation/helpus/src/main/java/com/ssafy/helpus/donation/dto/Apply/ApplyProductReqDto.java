package com.ssafy.helpus.donation.dto.Apply;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;

@ApiModel(value = "기부 물품")
@Getter
public class ApplyProductReqDto {

    @ApiModelProperty(value = "기부 물품 고유번호")
    @NotNull(message = "기부 물품 고유번호를 입력해주세요.")
    private Long donationProductId;

    @ApiModelProperty(value = "수량")
    @NotNull(message = "수량을 입력해주세요.")
    @PositiveOrZero(message = "0개 이상을 입력해주세요")
    private int count;
}
