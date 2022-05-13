package com.ssafy.helpus.service;

import com.ssafy.helpus.model.Certification;
import org.springframework.web.multipart.MultipartFile;

public interface CertificationService {

    boolean registerCertification(MultipartFile image, Certification certification);

    String getCertification(String certNum);
}
