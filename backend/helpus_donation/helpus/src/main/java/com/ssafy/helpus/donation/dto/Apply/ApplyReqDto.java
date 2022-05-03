package com.ssafy.helpus.donation.dto.Apply;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import java.util.List;

@ApiModel(value = "기부")
@Getter
public class ApplyReqDto {

    @ApiModelProperty(value = "기부 글 고유 번호")
    @NotNull
    private Long donationId;

    @ApiModelProperty(value = "송장 번호")
    private Integer expressNum;

    @ApiModelProperty(value = "기부하는 물품")
    List<ApplyProductReqDto> products;
}
