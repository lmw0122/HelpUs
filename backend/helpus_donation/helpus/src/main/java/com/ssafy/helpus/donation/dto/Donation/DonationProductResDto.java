package com.ssafy.helpus.donation.dto.Donation;

import com.ssafy.helpus.donation.dto.ProductDto;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;

@ApiModel(value = "기부 등록 물품")
@Getter
@Builder
public class DonationProductResDto {

    private Integer productId;
    private ProductDto product;
    private String productInfo;
    private Integer finishCount;
    private Integer deliveryCount;
    private Double percent;
}
