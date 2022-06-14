package com.ssafy.helpus.service.Impl;

import com.ssafy.helpus.model.Certification;
import com.ssafy.helpus.repository.CertificationRepository;
import com.ssafy.helpus.service.CertificationService;
import com.ssafy.helpus.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class CertificationServiceImpl implements CertificationService {

    @Autowired
    private final S3Service s3Service;
    @Autowired
    private final CertificationRepository certificationRepository;
    @Override
    public boolean registerCertification(MultipartFile image, Certification certification) {
        try {
            String url = s3Service.upload(image);
            certification.setUrl(url);
            certificationRepository.save(certification);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public String getCertification(String certNum) {
        Certification tmp = certificationRepository.findByCertificationNum(certNum);
        if(tmp == null)
            return null;
        else
            return tmp.getUrl();
    }
}
