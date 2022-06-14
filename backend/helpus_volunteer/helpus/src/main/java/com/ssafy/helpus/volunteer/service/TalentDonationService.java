package com.ssafy.helpus.volunteer.service;

import com.ssafy.helpus.volunteer.dto.TalentDonationUpdateReqDto;
import com.ssafy.helpus.volunteer.dto.TalentDonationReqDto;
import com.ssafy.helpus.volunteer.entity.Volunteer;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface TalentDonationService {
    // 재능기부 등록
    Map<String, Object> registerTalentDonation(TalentDonationReqDto talentDonationReqDto, Long memberId, MultipartFile[] files, String role) throws Exception;
    // 재능기부 수정
    Map<String, Object> updateTalentDonation(TalentDonationUpdateReqDto talentDonationUpdateReqDto, Long memberId, MultipartFile[] files, String role) throws Exception;
    // 재능기부 글 조회
    Map<String, Object> getTalentDonation(Long volunteerId) throws Exception;
    // 재능기부 글 삭제
    Map<String, Object> deleteTalentDonation(Long volunteerId) throws Exception;
    // 봉사글 목록
    Map<String, Object> listTalenDonation (String category, int page) throws Exception;
    // 목록만들기
    Map<String, Object> makeListTalentDonation(Page<Volunteer> volunteers, int page) throws Exception;

    // 재능기부 글 목록 - 메인
    Map<String, Object> mainListTalentDonation(String order, int page) throws Exception;
    // 내가 작성한 재능기부 글 목록
    Map<String, Object> myTalentDonationList(Long memberId, int page) throws Exception;
    // 검색 목록
    Map<String, Object> searchTalentDonationList(String keyword, int page) throws Exception;
}
