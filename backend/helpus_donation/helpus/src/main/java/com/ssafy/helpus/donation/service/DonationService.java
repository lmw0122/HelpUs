package com.ssafy.helpus.donation.service;

import com.ssafy.helpus.donation.dto.DonationReqDto;
import com.ssafy.helpus.donation.dto.DonationUpdateReqDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface DonationService {
    //기부 글 등록
    Map<String, Object> registerDonation(DonationReqDto donation, List<MultipartFile> files) throws Exception;
    //기부 글 수정
    Map<String, Object> updateDonation(DonationUpdateReqDto donation, List<MultipartFile> files) throws Exception;
    //기부 글 조회
    Map<String, Object> getDonation(Integer donationId) throws Exception;
    //기부 글 마감
    Map<String, Object> endDonation(Integer donationId) throws Exception;
    //기부 글 목록
    Map<String, Object> listDonation(Integer memberId, String order, int page);
}