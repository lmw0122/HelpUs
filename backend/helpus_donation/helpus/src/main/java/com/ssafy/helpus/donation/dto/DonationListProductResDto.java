package com.ssafy.helpus.donation.dto;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;

@ApiModel(value = "기부 등록 물품")
@Getter
@Builder
public class DonationListProductResDto {
    private ProductDto product;
    private Integer finishCount;
    private Double percent;
}
