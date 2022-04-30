package com.ssafy.helpus.donation.service;

import com.ssafy.helpus.donation.dto.DonationReqDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface DonationService {
    //기부 글 등록
    Map<String, Object> registerDonation(DonationReqDto donation, List<MultipartFile> files) throws Exception;
}
