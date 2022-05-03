package com.ssafy.helpus.donation.service.Impl;

import com.ssafy.helpus.donation.dto.Donation.DonationListProductResDto;
import com.ssafy.helpus.donation.dto.Donation.DonationProductResDto;
import com.ssafy.helpus.donation.entity.DonationProduct;
import com.ssafy.helpus.donation.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    @Override
    public List<DonationProductResDto> getDonationProduct(List<DonationProduct> donationProducts) {
        log.info("ProductService getDonationProduct call");

        List<DonationProductResDto> products = new ArrayList<>();
        for (DonationProduct donationProduct : donationProducts) {

            DonationProductResDto donationResDto = DonationProductResDto.builder()
                    .productId(donationProduct.getDonationProductId())
                    .productName(donationProduct.getProductName())
                    .totalCount(donationProduct.getTotalCount())
                    .productInfo(donationProduct.getProductInfo())
                    .finishCount(donationProduct.getFinishCount())
                    .deliveryCount(donationProduct.getDeliveryCount())
                    .percent(donationProduct.getPercent()).build();

            products.add(donationResDto);
        }
        return products;
    }

    @Override
    public List<DonationListProductResDto> getDonationListProduct(List<DonationProduct> donationProducts) {
        log.info("ProductService getDonationListProduct call");

        List<DonationListProductResDto> products = new ArrayList<>();
        for (DonationProduct donationProduct : donationProducts) {

            DonationListProductResDto donationResDto = DonationListProductResDto.builder()
                    .productName(donationProduct.getProductName())
                    .totalCount(donationProduct.getTotalCount())
                    .finishCount(donationProduct.getFinishCount())
                    .percent(donationProduct.getPercent()).build();

            products.add(donationResDto);
        }
        return products;
    }
}
