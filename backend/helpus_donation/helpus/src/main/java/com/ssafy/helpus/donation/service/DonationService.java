package com.ssafy.helpus.donation.service;

import com.ssafy.helpus.donation.dto.Donation.DonationReqDto;
import com.ssafy.helpus.donation.dto.Donation.DonationUpdateReqDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface DonationService {
    //기부 글 등록
    Map<String, Object> registerDonation(DonationReqDto donation, Long memberId, List<MultipartFile> files) throws Exception;
    //기부 글 수정
    Map<String, Object> updateDonation(DonationUpdateReqDto donation, List<MultipartFile> files) throws Exception;
    //기부 글 조회
    Map<String, Object> getDonation(Long donationId) throws Exception;
    //기부 글 마감
    Map<String, Object> endDonation(Long donationId) throws Exception;
    //기부 글 목록 - 메인/기부해주세요 페이지
    Map<String, Object> mainListDonation(String order, int page);
    //기부 글 목록 - 기관 페이지
    Map<String, Object> listDonation(Long memberId, String donationStatus, int page);
    //기부 제목 목록
    Map<String, Object> titleListDonation(Long memberId);
}