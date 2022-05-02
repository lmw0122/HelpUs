package com.ssafy.helpus.donation.dto;

import com.ssafy.helpus.donation.enumClass.DonationStatus;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@ApiModel(value = "물품 기부 글 목록")
@Getter
@Builder
public class DonationListResDto {
    @ApiModelProperty(value = "기부 글 고유번호")
    private Integer donationId;

    @ApiModelProperty(value = "제목")
    private String title;

    @ApiModelProperty(value = "내용")
    private String content;

    @ApiModelProperty(value = "종료일")
    private LocalDate endDate;

    @ApiModelProperty(value = "기관 프로필 사진")
    private String profile;

    @ApiModelProperty(value = "기관명")
    private String name;

    @ApiModelProperty(value = "마감 여부")
    private DonationStatus status;

    @ApiModelProperty(value = "달성률")
    private Double percent;

    @ApiModelProperty(value = "물품")
    private List<DonationListProductResDto> products;
}
