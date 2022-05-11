package com.ssafy.helpus.donation.service.Impl;

import com.ssafy.helpus.donation.dto.Donation.DonationListProductResDto;
import com.ssafy.helpus.donation.dto.Donation.DonationProductResDto;
import com.ssafy.helpus.donation.entity.Donation;
import com.ssafy.helpus.donation.entity.DonationApply;
import com.ssafy.helpus.donation.entity.DonationProduct;
import com.ssafy.helpus.donation.enumClass.DonationStatus;
import com.ssafy.helpus.donation.repository.DonationProductRepository;
import com.ssafy.helpus.donation.repository.DonationRepository;
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

    private final DonationProductRepository productRepository;
    private final DonationRepository donationRepository;

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

    @Override
    public void deliveryCompleted(DonationApply apply) {
        DonationProduct donationProduct = productRepository.findById(apply.getDonationProduct().getDonationProductId()).get();

        donationProduct.setDeliveryCount(donationProduct.getDeliveryCount() - apply.getCount()); //배송중 수량 변경
        donationProduct.setFinishCount(donationProduct.getFinishCount() + apply.getCount()); //도착 수량 변경

        double percent = (double)donationProduct.getFinishCount() / (double)donationProduct.getTotalCount() * 100.0;
        donationProduct.setPercent(percent); //각 물품 퍼센트 변경

        //전체 퍼센트 변경
        double totalPercent = productRepository.percentCalculation(apply.getDonation().getDonationId());
        Donation donation = donationRepository.findById(apply.getDonation().getDonationId()).get();
        donation.setPercent(totalPercent);

        if(totalPercent==100) donation.setStatus(DonationStatus.마감);
    }
}
