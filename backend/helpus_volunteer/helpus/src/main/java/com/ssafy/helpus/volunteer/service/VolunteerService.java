package com.ssafy.helpus.volunteer.service;

import com.ssafy.helpus.volunteer.dto.VolunteerReqDto;
import com.ssafy.helpus.volunteer.dto.VolunteerUpdateReqDto;
import com.ssafy.helpus.volunteer.entity.Volunteer;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface VolunteerService {

    // 봉사 등록
    Map<String, Object> registerVoluneer(VolunteerReqDto volunteerReqDto, Long memberId, MultipartFile[] files, String role) throws Exception;
    // 봉사 수정
    Map<String, Object> updateVolunteer(VolunteerUpdateReqDto volunteerUpdateReqDto, Long memberId, MultipartFile[] files, String role) throws Exception;
    // 봉사 글 조회
    Map<String, Object> getVoluneer(Long volunteerId) throws Exception;
    // 봉사 참석 여부
    Map<String, Object> getApplyStatus(Long volunteerId, Long memberId) throws Exception;
    // 재능기부 글 삭제
    Map<String, Object> deleteVolunteer(Long volunteerId) throws Exception;
    // 봉사 글 마감
    Map<String, Object> endVolunteer(Long volunteerId) throws Exception;
    // 봉사 신청
    Map<String, Object> applyVolunteer(Long volunteerId, Long memberId, String role) throws Exception;
    // 봉사글 목록
    Map<String, Object> listVolunteer (String category, String order, int page) throws Exception;
    // 목록 만들기
    Map<String, Object> makeListVolunteer (Page<Volunteer> volunteers) throws Exception;
    // 목록 만들기
//    Map<String, Object> makeListVolunteer2 (Page<Volunteer> not_end, Page<Volunteer> end) throws Exception;
    // 봉사 글 목록 - 메인
    Map<String, Object> mainListVolunteer(String order, int page) throws Exception;
    // 기업입장에서 내가 올린 봉사글들 목록
    Map<String, Object> myVolunteerList(Long memberId, int page, int status) throws Exception;
    // 내가 봉사한 봉사목록
    Map<String, Object> doVolunteerList(Long memberId, int page) throws Exception;

    // 내가 봉사한 목록 한번에
    Map<String, Object> myVolList (Long memberId) throws Exception;
}
