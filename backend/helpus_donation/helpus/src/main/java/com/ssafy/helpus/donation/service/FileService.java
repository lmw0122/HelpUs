package com.ssafy.helpus.donation.service;

import com.ssafy.helpus.donation.entity.Donation;
import com.ssafy.helpus.donation.entity.DonationConfirm;
import com.ssafy.helpus.donation.entity.DonationImage;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FileService {
    //파일 확장자 검사
    boolean fileExtensionCheck(List<MultipartFile> files) throws Exception;

    //기부 글 파일 저장
    void donationFileSave(Donation donation, List<MultipartFile> files) throws Exception;
    //기부 글 파일 삭제
    void donationFileDelete(List<DonationImage> files) throws Exception;
    //기부 글 이미지 조회
    List<String> getDonationFileList(List<DonationImage> files) throws Exception;

    //후기 글 파일 저장
    void confirmFileSave(DonationConfirm confirm, List<MultipartFile> files) throws Exception;
}
