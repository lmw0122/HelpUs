package com.ssafy.helpus.donation.dto.Donation;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@ApiModel(value = "물품 기부 글 제목 조회")
@Getter
@Builder
public class DonationTitleListResDto {

    @ApiModelProperty(value = "기부 글 고유번호")
    private Long donationId;

    @ApiModelProperty(value = "제목")
    private String title;
}
