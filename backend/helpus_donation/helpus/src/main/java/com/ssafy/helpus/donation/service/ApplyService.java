package com.ssafy.helpus.donation.service;

import com.ssafy.helpus.donation.dto.Apply.ApplyReqDto;
import com.ssafy.helpus.donation.dto.Apply.WaybillReqDto;

import java.util.Map;

public interface ApplyService {
    //기부
    Map<String, Object> applyDonation(ApplyReqDto apply, Long memberId) throws Exception;
    //운송장 번호 입력
    Map<String, Object> updateWaybill(WaybillReqDto waybillDto) throws Exception;
    //배송 완료
    Map<String, Object> deliveryCompleted(Long donationApplyId) throws Exception;
    //물품 후원 내역 - 기관
    Map<String, Object> orgApplyList(Long memberId, Long donationId, String type, int page);
    //물품 후원 내역 - 개인
    Map<String, Object> userApplyList(Long memberId, String type, int page);
    //물품 후원 전체 내역
    Map<String, Object> applyAllList(Long memberId) throws Exception;
}
