package com.ssafy.helpus.donation.service.Impl;

import com.ssafy.helpus.donation.entity.Donation;
import com.ssafy.helpus.donation.entity.DonationImage;
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
}
