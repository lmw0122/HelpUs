package com.ssafy.helpus.service;

import com.ssafy.helpus.model.HelpDesk;
import com.ssafy.helpus.model.HelpDeskImage;
import com.ssafy.helpus.model.Member;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FileService {
    public boolean fileExtensionCheck(List<MultipartFile> files) throws Exception;
    public void memberFileDelete(Member member) throws Exception;
    //고객센터 게시글 이미지 저장
    void deskFileSave(HelpDesk desk, List<MultipartFile> files) throws Exception;
    //고객센터 게시글 이미지 삭제
    void deskFileDelete(List<HelpDeskImage> helpDeskImages) throws Exception;
}
