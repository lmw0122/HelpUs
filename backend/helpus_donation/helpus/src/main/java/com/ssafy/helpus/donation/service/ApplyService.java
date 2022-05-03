package com.ssafy.helpus.donation.service;

import com.ssafy.helpus.donation.dto.Apply.ApplyReqDto;

import java.util.Map;

public interface ApplyService {
    //기부
    Map<String, Object> applyDonation(ApplyReqDto apply, Long memberId) throws Exception;
}
