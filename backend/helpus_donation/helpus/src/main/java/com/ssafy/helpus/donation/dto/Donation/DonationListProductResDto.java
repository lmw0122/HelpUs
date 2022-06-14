package com.ssafy.helpus.donation.dto.Donation;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;

@ApiModel(value = "기부 등록 물품")
@Getter
@Builder
public class DonationListProductResDto {
    private String productName;
    private Integer totalCount;
    private Integer finishCount;
    private Double percent;
}
