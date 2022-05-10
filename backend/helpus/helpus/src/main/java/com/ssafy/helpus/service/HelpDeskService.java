package com.ssafy.helpus.service;

import com.ssafy.helpus.dto.Desk.DeskReqDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface HelpDeskService {
    //고객센터 글 작성
    Map<String, Object> registerDesk(DeskReqDto desk, int memberId, List<MultipartFile> files) throws Exception ;
}
