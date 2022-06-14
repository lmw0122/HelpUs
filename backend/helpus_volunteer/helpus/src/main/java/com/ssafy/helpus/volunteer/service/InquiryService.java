package com.ssafy.helpus.volunteer.service;

import com.ssafy.helpus.volunteer.entity.Volunteer;
import com.ssafy.helpus.volunteer.entity.VolunteerApply;
import org.springframework.data.domain.Page;

import java.util.Map;

public interface InquiryService {
    // 내가(기업) 올린 봉사글 목록
    Map<String, Object> listOrg (Long memberId,String order, int page) throws Exception;
    // 봉사글 목록 만들기
    Map<String, Object> makeListOrg (Page<Volunteer> volunteers) throws Exception;
    // 내가올린 봉사글에 지원자 목록
    Map<String, Object> listApply (Long memberId,int page) throws Exception;
    // 지원자 목록 만들기
    Map<String, Object> makeListApply (Page<VolunteerApply> volunteerApplies) throws Exception;
    // 참석여부 변경
    Map<String, Object> checkApply (Long volunteerApplyId, int status) throws Exception;
}
