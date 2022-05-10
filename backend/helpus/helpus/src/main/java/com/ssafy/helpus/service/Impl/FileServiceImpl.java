package com.ssafy.helpus.service.Impl;

import com.ssafy.helpus.model.HelpDesk;
import com.ssafy.helpus.model.HelpDeskImage;
import com.ssafy.helpus.model.Member;
import com.ssafy.helpus.repository.DeskImageRepository;
import com.ssafy.helpus.service.FileService;
import com.ssafy.helpus.service.S3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {

    private final S3Service s3Service;
    private final DeskImageRepository deskImageRepository;

    @Override
    public boolean fileExtensionCheck(List<MultipartFile> files) throws Exception {
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
    public void memberFileDelete(Member member) throws Exception {

    }

    @Override
    public void deskFileSave(HelpDesk desk, List<MultipartFile> files) throws Exception {
        log.debug("FileService deskFileSave call");

        for (MultipartFile mfile : files) {
            String imgURL = s3Service.upload(mfile);  //S3에 파일 업로드 후 URL 가져오기
            HelpDeskImage file = HelpDeskImage.builder()
                    .url(imgURL)
                    .helpDesk(desk).build();
            deskImageRepository.save(file); //DB에 S3 URL 저장
        }
    }

    @Override
    public void deskFileDelete(List<HelpDeskImage> helpDeskImages) throws Exception {
        log.debug("FileService deskFileDelete call");

        for(HelpDeskImage file : helpDeskImages) {
            //S3에서 파일 삭제
            s3Service.delete(file.getUrl());
            //파일 테이블에서 삭제
            deskImageRepository.deleteById(file.getHelpDeskCommentId());
        }
    }
}
