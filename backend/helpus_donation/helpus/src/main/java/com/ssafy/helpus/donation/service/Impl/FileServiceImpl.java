package com.ssafy.helpus.donation.service.Impl;

import com.ssafy.helpus.donation.entity.Donation;
import com.ssafy.helpus.donation.entity.DonationConfirm;
import com.ssafy.helpus.donation.entity.DonationConfirmImage;
import com.ssafy.helpus.donation.entity.DonationImage;
import com.ssafy.helpus.donation.repository.DonationConfirmImageRepository;
import com.ssafy.helpus.donation.repository.DonationImageRepository;
import com.ssafy.helpus.donation.service.FileService;
import com.ssafy.helpus.donation.service.S3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {

    private final S3Service s3Service;
    private final DonationImageRepository donationImageRepository;
    private final DonationConfirmImageRepository confirmImageRepository;

    @Override
    public boolean fileExtensionCheck(List<MultipartFile> files) throws Exception{
        log.debug("FileService fileExtensionCheck call");

        for(MultipartFile mfile : files){ //파일 확장자 검사
            String originFileName = mfile.getOriginalFilename();
            String extension = originFileName.substring(originFileName.length()-3);

            if(!(extension.equals("jpg") || extension.equals("png") || extension.equals("JPG") || extension.equals("PNG")
                    || extension.equals("jpeg") || extension.equals("JPEG")))
                return false;
        }
        return true;
    }

    @Override
    public void donationFileSave(Donation donation, List<MultipartFile> files) throws Exception {
        log.debug("FileService donationFileSave call");

        for (MultipartFile mfile : files) {
            String imgURL = s3Service.upload(mfile);  //S3에 파일 업로드 후 URL 가져오기
            DonationImage file = DonationImage.builder()
                    .url(imgURL)
                    .donation(donation).build();
            donationImageRepository.save(file); //DB에 S3 URL 저장
        }
    }

    @Override
    public void donationFileDelete(List<DonationImage> files) throws Exception {
        log.debug("FileService donationFileDelete call");

        for(DonationImage file : files) {
            //S3에서 파일 삭제
            s3Service.delete(file.getUrl());
            //파일 테이블에서 삭제
            donationImageRepository.deleteById(file.getDonationImageId());
        }
    }

    @Override
    public List<String> getDonationFileList(List<DonationImage> files) throws Exception {
        log.debug("FileService getFileList call");

        List<String> images = new ArrayList<>();
        for(DonationImage i : files) {
            images.add(i.getUrl());
        }
        return images;
    }

    @Override
    public void confirmFileSave(DonationConfirm confirm, List<MultipartFile> files) throws Exception {
        log.debug("FileService confirmFileSave call");

        for (MultipartFile mfile : files) {
            String imgURL = s3Service.upload(mfile);  //S3에 파일 업로드 후 URL 가져오기
            DonationConfirmImage file = DonationConfirmImage.builder()
                    .url(imgURL)
                    .donationConfirm(confirm).build();
            confirmImageRepository.save(file); //DB에 S3 URL 저장
        }
    }

    @Override
    public void confirmFileDelete(List<DonationConfirmImage> images) {
        log.debug("FileService confirmFileDelete call");

        for(DonationConfirmImage file : images) {
            //S3에서 파일 삭제
            s3Service.delete(file.getUrl());
            //파일 테이블에서 삭제
            confirmImageRepository.deleteById(file.getDonationConfirmImageId());
        }
    }

    @Override
    public List<String> getConfirmFileList(List<DonationConfirmImage> files) throws Exception {
        log.debug("FileService getConfirmFileList call");

        List<String> images = new ArrayList<>();
        for(DonationConfirmImage i : files) {
            images.add(i.getUrl());
        }
        return images;
    }
}
