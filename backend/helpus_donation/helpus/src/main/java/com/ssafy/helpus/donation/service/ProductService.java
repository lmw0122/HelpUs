package com.ssafy.helpus.donation.service;

import com.ssafy.helpus.donation.dto.ProductReqDto;
import com.ssafy.helpus.donation.entity.Product;
import com.ssafy.helpus.donation.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    //물품 등록
    public Product registerProduct (ProductReqDto productReqDto) throws Exception {
        log.info("ProductService registerProduct call");

        Product product = Product.builder()
                .productName(productReqDto.getProductName())
                .count(productReqDto.getTotalCount()).build();
        productRepository.save(product);
        return product;
    }
}
