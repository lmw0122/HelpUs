package com.ssafy.helpus.donation.service.Impl;

import com.ssafy.helpus.donation.dto.Donation.*;
import com.ssafy.helpus.donation.entity.Donation;
import com.ssafy.helpus.donation.entity.DonationProduct;
import com.ssafy.helpus.donation.enumClass.DonationOrder;
import com.ssafy.helpus.donation.enumClass.DonationStatus;
import com.ssafy.helpus.donation.repository.DonationProductRepository;
import com.ssafy.helpus.donation.repository.DonationRepository;
import com.ssafy.helpus.donation.service.DonationService;
import com.ssafy.helpus.donation.service.FileService;
import com.ssafy.helpus.member.service.MemberService;
import com.ssafy.helpus.utils.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class DonationServiceImpl implements DonationService {

    private final DonationRepository donationRepository;
    private final DonationProductRepository donationProductRepository;

    private final ProductServiceImpl productService;
    private final FileService fileService;
    private final MemberService memberService;

    @Override
    public Map<String, Object> registerDonation(DonationReqDto donationDto, Long memberId, List<MultipartFile> files) throws Exception {
        log.info("DonationService registerDonation call");

        Map<String, Object> resultMap = new HashMap<>();

        //게시글 저장
        Donation donation = Donation.builder()
                .memberId(memberId)
                .title(donationDto.getTitle())
                .content(donationDto.getContent())
                .endDate(donationDto.getEndDate()).build();
        donationRepository.save(donation);

        //물품 저장
        for(DonationProductReqDto productDto : donationDto.getProducts()) {

            DonationProduct donationProduct = DonationProduct.builder()
                    .donation(donation)
                    .productName(productDto.getProductName())
                    .productInfo(productDto.getProductInfo())
                    .totalCount(productDto.getTotalCount()).build();
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

        //게시글 파일 수정시 기존 파일 삭제 후 새로 저장
        if(files != null) {
            fileService.donationFileDelete(donation.get().getImages());
            fileService.donationFileSave(donation.get(), files);
        }
        resultMap.put("message", Message.DONATION_UPDATE_SUCCESS);
        return resultMap;
    }

    @Override
    @Transactional
    public Map<String, Object> getDonation(Long donationId) throws Exception {
        log.info("DonationService getDonation call");

        Map<String, Object> resultMap = new HashMap<>();

        Optional<Donation> donation = donationRepository.findById(donationId);
        if(!donation.isPresent()) {
            resultMap.put("message", Message.DONATION_NOT_FOUND);
            return resultMap;
        }

        DonationResDto donationResDto = DonationResDto.builder()
                .memberId(donation.get().getMemberId())
                .title(donation.get().getTitle())
                .content(donation.get().getContent())
                .createDate(donation.get().getCreateDate())
                .updateDate(donation.get().getUpdateDate())
                .endDate(donation.get().getEndDate())
                .images(fileService.getDonationFileList(donation.get().getImages()))
                .products(productService.getDonationProduct(donation.get().getProducts())).build();

        resultMap.put("message", Message.DONATION_FIND_SUCCESS);
        resultMap.put("donation", donationResDto);
        return resultMap;
    }

    @Override
    @Transactional
    public Map<String, Object> endDonation(Long donationId) throws Exception {
        log.info("DonationService endDonation call");

        Map<String, Object> resultMap = new HashMap<>();

        Optional<Donation> donation = donationRepository.findById(donationId);
        if(!donation.isPresent() || donation.get().getStatus().equals(DonationStatus.마감)) {
            resultMap.put("message", Message.DONATION_NOT_FOUND);
            return resultMap;
        }

        donation.get().setStatus(DonationStatus.마감);

        resultMap.put("message", Message.DONATION_END_SUCCESS);
        return resultMap;
    }

    @Override
    public Map<String, Object> mainListDonation(String order, int page) {
        log.info("DonationService mainListDonation call");

        Sort sort = gerOrder(order);
        Page<Donation> donations  = donationRepository.findByStatus(DonationStatus.진행, PageRequest.of(page, 6, sort));

        return makeListDonation(donations);
    }

    @Override
    public Map<String, Object> listDonation(Long memberId, String donationStatus, int page) {
        log.info("DonationService listDonation call");

        Page<Donation> donations;

        if(donationStatus.equals(DonationStatus.진행.toString()) || donationStatus.equals(DonationStatus.마감.toString())) {
            donations = donationRepository.findByMemberIdAndStatus(memberId, DonationStatus.valueOf(donationStatus), PageRequest.of(page, 6, Sort.by("donationId").descending()));
        }else { //후기 미작성
            donations = donationRepository.findByMemberId(memberId, PageRequest.of(page, 6, Sort.by("donationId").ascending()));
        }

        return makeListDonation(donations);
    }

    public Map<String, Object> makeListDonation(Page<Donation> donations) {
        Map<String, Object> resultMap = new HashMap<>();

        if(donations.isEmpty()) {
            resultMap.put("message", Message.DONATION_NOT_FOUND);
            return resultMap;
        }
        List<DonationListResDto> list = new ArrayList<>();
        for(Donation donation : donations) {
            Map<String, String> member = memberService.getMember(donation.getMemberId());

            DonationListResDto donationListResDto = DonationListResDto.builder()
                    .donationId(donation.getDonationId())
                    .title(donation.getTitle())
                    .content(donation.getContent())
                    .endDate(donation.getEndDate())
                    .percent(donation.getPercent())
                    .status(donation.getStatus())
                    .name(member.get("name"))
                    .profile(member.get("profile"))
                    .products(productService.getDonationListProduct(donation.getProducts())).build();

            list.add(donationListResDto);
        }

        resultMap.put("donation", list);
        resultMap.put("totalPage", donations.getTotalPages());
        resultMap.put("message", Message.DONATION_FIND_SUCCESS);
        return resultMap;
    }

    @Override
    public Map<String, Object> titleListDonation(Long memberId) {
        log.info("DonationService listDonation call");

        Map<String, Object> resultMap = new HashMap<>();

        List<Donation> donation = donationRepository.findByMemberId(memberId);
        if(donation.isEmpty()) {
            resultMap.put("message", Message.DONATION_NOT_FOUND);
            return resultMap;
        }

        List<DonationTitleListResDto> list = new ArrayList<>();
        for(Donation d : donation) {
            DonationTitleListResDto donationDto = DonationTitleListResDto.builder()
                    .donationId(d.getDonationId())
                    .title(d.getTitle()).build();
            list.add(donationDto);
        }

        resultMap.put("message", Message.DONATION_FIND_SUCCESS);
        resultMap.put("donation", list);
        return resultMap;
    }

    public Sort gerOrder(String order) {
        //정렬(최신, 달성률 높은, 달성률 낮은, 오래된)
        if(order.equals(DonationOrder.최신순.toString())) { return Sort.by("donationId").descending(); }
        else if(order.equals(DonationOrder.오래된순.toString())) { return Sort.by("donationId").ascending(); }
        else if(order.equals(DonationOrder.높은순.toString())) { return Sort.by("percent").descending(); }
        else { return Sort.by("percent").ascending(); }
    }
}