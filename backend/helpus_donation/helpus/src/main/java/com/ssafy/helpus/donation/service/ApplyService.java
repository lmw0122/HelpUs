package com.ssafy.helpus.donation.service;

import com.ssafy.helpus.donation.dto.Apply.ApplyReqDto;
import com.ssafy.helpus.donation.dto.Apply.WaybillReqDto;

import java.util.Map;

public interface ApplyService {
    //기부
    Map<String, Object> applyDonation(ApplyReqDto apply, Long memberId) throws Exception;
    //운송장 번호 입력
    Map<String, Object> updateWaybill(WaybillReqDto waybillDto) throws Exception;
}
