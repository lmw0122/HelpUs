package com.ssafy.helpus.donation.dto.Apply;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;

@ApiModel(value = "기부")
@Getter
public class ApplyReqDto {

    @ApiModelProperty(value = "기부 글 고유 번호")
    @NotNull
    private Long donationId;

    @ApiModelProperty(value = "택배사")
    private String parcel;

    @ApiModelProperty(value = "송장 번호")
    private Integer invoice;

    @ApiModelProperty(value = "기부 물품 고유번호")
    @NotNull(message = "기부 물품 고유번호를 입력해주세요.")
    private Long donationProductId;

    @ApiModelProperty(value = "수량")
    @NotNull(message = "수량을 입력해주세요.")
    @PositiveOrZero(message = "0개 이상을 입력해주세요")
    private int count;
}
