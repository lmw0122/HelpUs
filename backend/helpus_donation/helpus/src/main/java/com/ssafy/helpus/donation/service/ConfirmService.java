package com.ssafy.helpus.donation.service;

import com.ssafy.helpus.donation.dto.Confirm.ConfirmReqDto;
import com.ssafy.helpus.donation.dto.Confirm.ConfirmUpdateReqDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface ConfirmService {
    //후기 글 등록
    Map<String, Object> registerConfirm(ConfirmReqDto confirmDto, List<MultipartFile> files) throws Exception;
    //후기 글 수정
    Map<String, Object> updateConfirm(ConfirmUpdateReqDto confirmDto, List<MultipartFile> files) throws Exception;
}
