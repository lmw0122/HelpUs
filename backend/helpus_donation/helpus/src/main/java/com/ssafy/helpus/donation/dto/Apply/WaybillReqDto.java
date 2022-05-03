package com.ssafy.helpus.donation.dto.Apply;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@ApiModel(value = "운송장")
@Getter
public class WaybillReqDto {

    @ApiModelProperty(value = "기부 고유번호")
    @NotNull(message = "기부 고유번호를 입력해주세요.")
    private Long donationApplyId;

    @ApiModelProperty(value = "작성자 고유 번호")
    @NotNull(message = "작성자 고유 번호를 입력해주세요")
    private Long memberId;

    @ApiModelProperty(value = "송장 번호")
    @NotNull(message = "송장 번호를 입력해주세요.")
    private Integer invoice;

    @ApiModelProperty(value = "택배사")
    @NotBlank(message = "택배사를 입력해주세요")
    private String parcel;
}
