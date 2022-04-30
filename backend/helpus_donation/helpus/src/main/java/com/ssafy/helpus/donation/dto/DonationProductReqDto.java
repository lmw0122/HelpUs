package com.ssafy.helpus.donation.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@ApiModel(value = "기부 등록 물품")
@Getter
public class DonationProductReqDto {
    @ApiModelProperty(value = "물품")
    private ProductReqDto product;

    @ApiModelProperty(value = "물품 설명")
    @NotBlank(message = "물품 설명을 입력해주세요")
    private String productInfo;
}
