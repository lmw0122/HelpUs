package com.ssafy.helpus.service;

import com.ssafy.helpus.dto.Desk.DeskReqDto;
import com.ssafy.helpus.dto.Desk.DeskUpdateReqDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface HelpDeskService {
    //고객센터 글 작성
    Map<String, Object> registerDesk(DeskReqDto desk, int memberId, List<MultipartFile> files) throws Exception ;
    //고객센터 글 수정
    Map<String, Object> updateDesk(DeskUpdateReqDto desk, List<MultipartFile> files) throws Exception;
    //고객센터 글 조회
    Map<String, Object> getHelpDesk(Long helpDeskId) throws Exception;
    //고객센터 목록 조회
    Map<String, Object> helpDeskList(String category, String word, Integer memberId, int page) throws Exception;
}
