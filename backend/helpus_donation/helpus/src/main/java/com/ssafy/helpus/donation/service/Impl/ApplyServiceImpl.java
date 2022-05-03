package com.ssafy.helpus.donation.service.Impl;

import com.ssafy.helpus.donation.dto.Apply.ApplyReqDto;
import com.ssafy.helpus.donation.dto.Apply.WaybillReqDto;
import com.ssafy.helpus.donation.entity.DonationApply;
import com.ssafy.helpus.donation.entity.DonationProduct;
import com.ssafy.helpus.donation.enumClass.ApplyStatus;
import com.ssafy.helpus.donation.repository.DonationApplyRepository;
import com.ssafy.helpus.donation.service.ApplyService;
import com.ssafy.helpus.donation.service.ProductService;
import com.ssafy.helpus.utils.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ApplyServiceImpl implements ApplyService {

    private final DonationApplyRepository applyRepository;

    private final ProductService productService;

    @Override
    public Map<String, Object> applyDonation(ApplyReqDto applyDto, Long memberId) throws Exception {
        log.info("ApplyService applyDonation call");

        Map<String, Object> resultMap = new HashMap<>();

        //기부 물품 배송중 수량 변경
        DonationProduct donationProduct = productService.addApplyProduct(applyDto);

        DonationApply apply;
        //기부 내역 저장
        if(applyDto.getInvoice()!= null) {
            apply = DonationApply.builder()
                    .donationId(applyDto.getDonationId())
                    .memberId(memberId)
                    .donationProduct(donationProduct)
                    .count(applyDto.getCount())
                    .parcel(applyDto.getParcel())
                    .invoice(applyDto.getInvoice())
                    .status(ApplyStatus.배송중).build();
        } else {
            apply = DonationApply.builder()
                    .donationId(applyDto.getDonationId())
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

        apply.get().setInvoice(waybillDto.getInvoice());
        apply.get().setParcel(waybillDto.getParcel());
        apply.get().setStatus(ApplyStatus.배송중);

        resultMap.put("message", Message.INVOICE_UPDATE_SUCCESS);
        return resultMap;
    }
}