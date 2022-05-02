package com.ssafy.helpus.donation.service;


import com.ssafy.helpus.donation.dto.Confirm.ConfirmReqDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface ConfirmService {
    Map<String, Object> registerConfirm(ConfirmReqDto confirmDto, List<MultipartFile> files) throws Exception;
}
