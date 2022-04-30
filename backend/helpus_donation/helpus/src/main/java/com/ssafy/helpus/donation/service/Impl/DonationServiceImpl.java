package com.ssafy.helpus.donation.service.Impl;

import com.ssafy.helpus.donation.dto.DonationProductReqDto;
import com.ssafy.helpus.donation.dto.DonationReqDto;
import com.ssafy.helpus.donation.dto.DonationUpdateReqDto;
import com.ssafy.helpus.donation.entity.Donation;
import com.ssafy.helpus.donation.entity.DonationProduct;
import com.ssafy.helpus.donation.entity.Product;
import com.ssafy.helpus.donation.enumClass.DonationStatus;
import com.ssafy.helpus.donation.repository.DonationProductRepository;
import com.ssafy.helpus.donation.repository.DonationRepository;
import com.ssafy.helpus.donation.service.DonationService;
import com.ssafy.helpus.donation.service.FileService;
import com.ssafy.helpus.donation.service.ProductService;
import com.ssafy.helpus.utils.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class DonationServiceImpl implements DonationService {

    private final DonationRepository donationRepository;
    private final DonationProductRepository donationProductRepository;

    private final ProductService productService;
    private final FileService fileService;

    @Override
    public Map<String, Object> registerDonation(DonationReqDto donationDto, List<MultipartFile> files) throws Exception {
        log.info("DonationService registerDonation call");

        Map<String, Object> resultMap = new HashMap<>();

        //게시글 저장
        Donation donation = Donation.builder()
                        .memberId(donationDto.getMemberId())
                        .title(donationDto.getTitle())
                        .content(donationDto.getContent())
                        .endDate(donationDto.getEndDate()).build();
        donationRepository.save(donation);

        //물품 저장
        for(DonationProductReqDto productDto : donationDto.getProducts()) {
            Product product = productService.registerProduct(productDto.getProduct());

            DonationProduct donationProduct = DonationProduct.builder()
                    .donation(donation)
                    .product(product)
                    .productInfo(productDto.getProductInfo()).build();
            donationProductRepository.save(donationProduct);
        }

        //게시글 파일 저장
        fileService.donationFileSave(donation, files);

        resultMap.put("message", Message.DONATION_REGISTER_SUCCESS);
        resultMap.put("boardId", donation.getDonationId());

        return resultMap;
    }

    @Override
    @Transactional
    public Map<String, Object> updateDonation(DonationUpdateReqDto donationDto, List<MultipartFile> files) throws Exception {
        log.info("DonationService updateDonation call");

        Map<String, Object> resultMap = new HashMap<>();

        Optional<Donation> donation = donationRepository.findById(donationDto.getDonationId());
        if(!donation.isPresent() || donation.get().getStatus().equals(DonationStatus.마감)) {
            resultMap.put("message", Message.DONATION_NOT_FOUND);
            return resultMap;
        }

        donation.get().setTitle(donationDto.getTitle());
        donation.get().setContent(donationDto.getContent());
        donation.get().setUpdateDate(LocalDateTime.now());

        //게시글 파일 삭제 후 저장
        fileService.donationFileDelete(donation.get().getImages());
        fileService.donationFileSave(donation.get(), files);

        resultMap.put("message", Message.DONATION_UPDATE_SUCCESS);
        return resultMap;
    }
}
