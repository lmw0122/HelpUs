package com.ssafy.helpus.donation.service;

import com.ssafy.helpus.donation.dto.Donation.DonationListProductResDto;
import com.ssafy.helpus.donation.dto.Donation.DonationProductResDto;
import com.ssafy.helpus.donation.dto.ProductDto;
import com.ssafy.helpus.donation.entity.DonationProduct;
import com.ssafy.helpus.donation.entity.Product;

import java.util.List;

public interface ProductService {
    //물품 등록
    Product registerProduct (ProductDto productReqDto);
    //물품 조회
    ProductDto getProduct(Product product);
    //기부 글 물품 조회
    List<DonationProductResDto> getDonationProduct(List<DonationProduct> donationProducts);
    //기부 목록 물품 조회
    List<DonationListProductResDto> getDonationListProduct(List<DonationProduct> donationProducts);
}
