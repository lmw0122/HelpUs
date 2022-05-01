package com.ssafy.helpus.donation.service;

import com.ssafy.helpus.donation.dto.DonationProductResDto;
import com.ssafy.helpus.donation.dto.ProductDto;
import com.ssafy.helpus.donation.entity.DonationProduct;
import com.ssafy.helpus.donation.entity.Product;
import com.ssafy.helpus.donation.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    //물품 등록
    public Product registerProduct (ProductDto productReqDto) {
        log.info("ProductService registerProduct call");

        Product product = Product.builder()
                .productName(productReqDto.getProductName())
                .count(productReqDto.getTotalCount()).build();
        productRepository.save(product);
        return product;
    }

    //물품 조회
    public ProductDto getProduct(Product product) {
        log.info("ProductService getProduct call");

        ProductDto productReqDto = ProductDto.builder()
                .productName(product.getProductName())
                .totalCount(product.getCount()).build();
        return productReqDto;
    }

    //기부 글 물품 조회
    public List<DonationProductResDto> getDonationProduct(List<DonationProduct> donationProducts) {
        log.info("ProductService getDonationProduct call");

        List<DonationProductResDto> products = new ArrayList<>();
        for (DonationProduct donationProduct : donationProducts) {

            double totalCount = donationProduct.getProduct().getCount();
            double finishCount = donationProduct.getFinishCount();
            Double percent = finishCount / totalCount * 100.0;

            DonationProductResDto donationResDto = DonationProductResDto.builder()
                    .productId(donationProduct.getDonationProductId())
                    .product(getProduct(donationProduct.getProduct()))
                    .productInfo(donationProduct.getProductInfo())
                    .finishCount(donationProduct.getFinishCount())
                    .deliveryCount(donationProduct.getDeliveryCount())
                    .percent(percent).build();

            products.add(donationResDto);
        }
        return products;
    }
}
