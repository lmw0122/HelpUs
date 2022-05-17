package com.ssafy.helpus.donation.service.Impl;

import com.ssafy.helpus.donation.dto.Apply.ApplyAllListResDto;
import com.ssafy.helpus.donation.dto.Apply.ApplyListResDto;
import com.ssafy.helpus.donation.dto.Apply.ApplyReqDto;
import com.ssafy.helpus.donation.dto.Apply.WaybillReqDto;
import com.ssafy.helpus.donation.entity.Donation;
import com.ssafy.helpus.donation.entity.DonationApply;
import com.ssafy.helpus.donation.entity.DonationProduct;
import com.ssafy.helpus.donation.enumClass.ApplyStatus;
import com.ssafy.helpus.donation.repository.DonationApplyRepository;
import com.ssafy.helpus.donation.repository.DonationProductRepository;
import com.ssafy.helpus.donation.repository.DonationRepository;
import com.ssafy.helpus.donation.service.ApplyService;
import com.ssafy.helpus.donation.service.ProductService;
import com.ssafy.helpus.member.service.MemberService;
import com.ssafy.helpus.utils.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class ApplyServiceImpl implements ApplyService {

    private final DonationApplyRepository applyRepository;
    private final DonationProductRepository productRepository;
    private final DonationRepository donationRepository;

    private final ProductService productService;
    private final MemberService memberService;

    @Override
    @Transactional
    public Map<String, Object> applyDonation(ApplyReqDto applyDto, Long memberId) throws Exception {
        log.info("ApplyService applyDonation call");

        Map<String, Object> resultMap = new HashMap<>();

        Donation donation = donationRepository.findById(applyDto.getDonationId()).get();
        DonationProduct donationProduct = productRepository.findById(applyDto.getDonationProductId()).get();

        DonationApply apply;
        //기부 내역 저장
        if(applyDto.getInvoice()!= null) {
            //기부 물품 배송중 수량 변경
            donationProduct.setDeliveryCount(donationProduct.getDeliveryCount() + applyDto.getCount());

            apply = DonationApply.builder()
                    .donation(donation)
                    .memberId(memberId)
                    .donationProduct(donationProduct)
                    .count(applyDto.getCount())
                    .parcel(applyDto.getParcel())
                    .invoice(applyDto.getInvoice())
                    .status(ApplyStatus.배송중).build();
        } else {
            // 배송 대기 수량 변경
            donationProduct.setWaitingCount(donationProduct.getWaitingCount()+applyDto.getCount());

            apply = DonationApply.builder()
                    .donation(donation)
                    .memberId(memberId)
                    .donationProduct(donationProduct)
                    .count(applyDto.getCount())
                    .status(ApplyStatus.배송대기).build();
        }
        applyRepository.save(apply);

        resultMap.put("message", Message.DONATION_APPLY_SUCCESS);
        return resultMap;
    }

    @Override
    @Transactional
    public Map<String, Object> updateWaybill(WaybillReqDto waybillDto) throws Exception {
        log.info("ApplyService updateWaybill call");

        Map<String, Object> resultMap = new HashMap<>();

        Optional<DonationApply> apply = applyRepository.findById(waybillDto.getDonationApplyId());
        if (!apply.isPresent()) {
            resultMap.put("message", Message.APPLY_NOT_FOUND);
            return resultMap;
        }

        if(apply.get().getInvoice()==null) {
            DonationProduct donationProduct = productRepository.findById(apply.get().getDonationProduct().getDonationProductId()).get();
            donationProduct.setDeliveryCount(donationProduct.getDeliveryCount() + apply.get().getCount());
            donationProduct.setWaitingCount(donationProduct.getWaitingCount() - apply.get().getCount());
        }

        apply.get().setInvoice(waybillDto.getInvoice());
        apply.get().setParcel(waybillDto.getParcel());
        apply.get().setStatus(ApplyStatus.배송중);

        resultMap.put("message", Message.INVOICE_UPDATE_SUCCESS);
        return resultMap;
    }

    @Override
    @Transactional
    public Map<String, Object> deliveryCompleted(Long donationApplyId) throws Exception {
        log.info("ApplyService deliveryCompleted call");

        Map<String, Object> resultMap = new HashMap<>();

        Optional<DonationApply> apply = applyRepository.findById(donationApplyId);
        if (!apply.isPresent()) {
            resultMap.put("message", Message.APPLY_NOT_FOUND);
            return resultMap;
        }

        apply.get().setStatus(ApplyStatus.배송완료);

        productService.deliveryCompleted(apply.get()); //수량 계산

        resultMap.put("message", Message.DELIVERY_UPDATE_SUCCESS);
        return resultMap;
    }

    @Override
    public Map<String, Object> userApplyList(Long memberId, String type, int page) {
        log.info("ApplyService userApplyList call");

        if(type.equals("all")) {
            return applyAllList(memberId);
        } else {
            Page<DonationApply> applies;
            if (type.equals("tracking"))
                applies = applyRepository.findByMemberIdAndStatusNot(memberId, ApplyStatus.배송완료, PageRequest.of(page, 10, Sort.by("status").ascending()));
            else
                applies = applyRepository.findByMemberIdAndStatus(memberId, ApplyStatus.배송완료, PageRequest.of(page, 10, Sort.by("donationApplyId").descending()));
            return makeList(applies, "user");
        }
    }

    @Override
    public Map<String, Object> applyAllList(Long memberId){
        log.info("ApplyService applyAllList call");

        List<DonationApply> applies = applyRepository.findByMemberIdAndStatusOrderByDonationApplyIdDesc(memberId, ApplyStatus.배송완료);

        Map<String, Object> resultMap = new HashMap<>();

        if(applies.isEmpty()) {
            resultMap.put("message", Message.APPLY_NOT_FOUND);
            return resultMap;
        }

        List<ApplyAllListResDto> list = new ArrayList<>();
        for(DonationApply apply : applies) {
            ApplyAllListResDto applyDto = ApplyAllListResDto.builder()
                    .orgName(memberService.getMemberName(apply.getDonation().getMemberId()))
                    .name(memberService.getMemberName(memberId))
                    .productName(apply.getDonationProduct().getProductName())
                    .count(apply.getCount())
                    .donationDate(apply.getDonationDate()).build();
            list.add(applyDto);
        }

        resultMap.put("apply", list);
        resultMap.put("message", Message.APPLY_FIND_SUCCESS);
        return resultMap;
    }

    @Override
    public Map<String, Object> orgApplyList(Long memberId, Long donationId, String type, int page) {
        log.info("ApplyService orgApplyList call");

        ApplyStatus status = type.equals("tracking") ? ApplyStatus.배송중 : ApplyStatus.배송완료;
        Page<DonationApply> applies;

        if(donationId == null) { //전체 조회
            List<Donation> donations = donationRepository.findByMemberId(memberId);

            if(donations.isEmpty()) { //기부 글이 없을 경우
                return new HashMap<>(){{put("message", Message.DONATION_NOT_FOUND);}};
            }

            applies = applyRepository.findByStatusAndDonationIn(status, donations, PageRequest.of(page, 10, Sort.by("donationApplyId").ascending()));
        } else { //글별 조회
            Donation donation = donationRepository.findById(donationId).get();
            applies = applyRepository.findByStatusAndDonation(status, donation, PageRequest.of(page, 10, Sort.by("donationApplyId").ascending()));
        }

        return makeList(applies, "org");
    }

    public Map<String, Object> makeList(Page<DonationApply> applies, String type) {
        Map<String, Object> resultMap = new HashMap<>();

        if(applies.isEmpty()) {
            resultMap.put("message", Message.APPLY_NOT_FOUND);
            return resultMap;
        }

        List<ApplyListResDto> list = new ArrayList<>();
        for(DonationApply apply : applies) {
            Long memberId = type.equals("user") ? apply.getDonation().getMemberId() : apply.getMemberId();
            String end = type.equals("user") ? (ChronoUnit.DAYS.between(apply.getInvoiceEndDate(), LocalDate.now()))+ "일" : "";

            ApplyListResDto applyDto = ApplyListResDto.builder()
                    .donationApplyId(apply.getDonationApplyId())
                    .donationId(apply.getDonation().getDonationId())
                    .memberId(memberId)
                    .name(memberService.getMemberName(memberId))
                    .title(apply.getDonation().getTitle())
                    .productName(apply.getDonationProduct().getProductName())
                    .count(apply.getCount())
                    .parcel(apply.getParcel())
                    .invoice(apply.getInvoice())
                    .donationDate(apply.getDonationDate())
                    .end(end)
                    .status(apply.getStatus()).build();
            list.add(applyDto);
        }

        resultMap.put("apply", list);
        resultMap.put("message", Message.APPLY_FIND_SUCCESS);
        resultMap.put("totalPage", applies.getTotalPages());
        return resultMap;
    }
}
