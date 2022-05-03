package com.ssafy.helpus.donation.dto.Donation;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;

@ApiModel(value = "기부 등록 물품")
@Getter
@Builder
public class DonationProductResDto {

    private Long productId;
    private String productName;
    private String productInfo;
    private Integer totalCount;
    private Integer finishCount;
    private Integer deliveryCount;
    private Double percent;
}
