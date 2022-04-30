package com.ssafy.helpus.donation.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;

@ApiModel(value = "물품 등록")
@Getter
public class ProductReqDto {
    @ApiModelProperty(value = "물품명")
    @NotBlank(message = "물품 명을 입력해주세요")
    private String productName;

    @ApiModelProperty(value = "전체 수량")
    @NotNull(message = "수량을 입력해주세요.")
    @PositiveOrZero(message = "0개 이상을 입력해주세요")
    private int totalCount;
}
