package com.ssafy.helpus.service;

import com.ssafy.helpus.model.HelpDesk;
import com.ssafy.helpus.model.Member;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FileService {
    public boolean fileExtensionCheck(List<MultipartFile> files) throws Exception;
    public void memberFileDelete(Member member) throws Exception;

    void deskFileSave(HelpDesk desk, List<MultipartFile> files) throws Exception;
}
