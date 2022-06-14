package com.ssafy.helpus.volunteer.service.Impl;

import com.ssafy.helpus.volunteer.entity.Volunteer;
import com.ssafy.helpus.volunteer.entity.VolunteerImage;
import com.ssafy.helpus.volunteer.repository.VolunteerImageRepository;
import com.ssafy.helpus.volunteer.service.FileService;
import com.ssafy.helpus.volunteer.service.S3Service;
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
    private final VolunteerImageRepository volunteerImageRepository;

    @Override
    public boolean fileExtensionCheck(MultipartFile[] files) throws Exception {
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
    public void volunteerFileSave(Volunteer volunteer, MultipartFile[] files) throws Exception {
        log.debug("FileService donationFileSave call");

        for (MultipartFile mfile : files) {
            String imgURL = s3Service.upload(mfile);  //S3에 파일 업로드 후 URL 가져오기
            VolunteerImage file = VolunteerImage.builder()
                    .url(imgURL)
                    .volunteer(volunteer).build();
            volunteerImageRepository.save(file);
        }

    }

    @Override
    public void volunteerFileDelete(List<VolunteerImage> files) throws Exception {
        log.debug("FileService donationFileDelete call");

        for(VolunteerImage file : files) {
            //S3에서 파일 삭제
            s3Service.delete(file.getUrl());
            //파일 테이블에서 삭제
            volunteerImageRepository.deleteById(file.getVolunteerImageId());
        }
    }

    @Override
    public List<String> getVolunteerFileList(List<VolunteerImage> files) throws Exception {
        log.debug("FileService getFileList call");

        List<String> images = new ArrayList<>();
        for(VolunteerImage i : files) {
            images.add(i.getUrl());
        }
        return images;
    }
}
