package com.ssafy.helpus.donation.service.Impl;

import com.ssafy.helpus.donation.dto.Donation.DonationListProductResDto;
import com.ssafy.helpus.donation.dto.Donation.DonationProductResDto;
import com.ssafy.helpus.donation.dto.ProductDto;
import com.ssafy.helpus.donation.entity.DonationProduct;
import com.ssafy.helpus.donation.entity.Product;
import com.ssafy.helpus.donation.repository.ProductRepository;
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

    private final ProductRepository productRepository;

    @Override
    public Product registerProduct(ProductDto productReqDto) {
        log.info("ProductService registerProduct call");

        Product product = Product.builder()
                .productName(productReqDto.getProductName())
                .count(productReqDto.getTotalCount()).build();
        productRepository.save(product);
        return product;
    }

    @Override
    public ProductDto getProduct(Product product) {
        log.info("ProductService getProduct call");

        ProductDto productReqDto = ProductDto.builder()
                .productName(product.getProductName())
                .totalCount(product.getCount()).build();
        return productReqDto;
    }

    @Override
    public List<DonationProductResDto> getDonationProduct(List<DonationProduct> donationProducts) {
        log.info("ProductService getDonationProduct call");

        List<DonationProductResDto> products = new ArrayList<>();
        for (DonationProduct donationProduct : donationProducts) {

            DonationProductResDto donationResDto = DonationProductResDto.builder()
                    .productId(donationProduct.getDonationProductId())
                    .product(getProduct(donationProduct.getProduct()))
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
                    .product(getProduct(donationProduct.getProduct()))
                    .finishCount(donationProduct.getFinishCount())
                    .percent(donationProduct.getPercent()).build();

            products.add(donationResDto);
        }
        return products;
    }
}
