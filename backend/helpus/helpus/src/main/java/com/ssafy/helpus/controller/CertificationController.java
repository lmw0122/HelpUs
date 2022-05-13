package com.ssafy.helpus.controller;

import com.ssafy.helpus.dto.Member.MemberDto;
import com.ssafy.helpus.model.Certification;
import com.ssafy.helpus.service.CertificationService;
import com.ssafy.helpus.service.Impl.CertificationServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/certi")
public class CertificationController {

    @Autowired
    CertificationService certificationService;
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity registerCertification(@RequestPart Certification certification, @RequestPart MultipartFile image){
        boolean result = certificationService.registerCertification(image, certification);

        if(result)
            return new ResponseEntity(result, HttpStatus.OK);
        else
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/search/{cert_num}")
    public ResponseEntity<Map<String,Object>> getCertification(@PathVariable("cert_num")String certNum){
        Map<String,Object> resultMap = new HashMap<>();
        String resultString = certificationService.getCertification(certNum);
        boolean result = true;
        if(resultString == null){
            result = false;
            resultMap.put("result",result);
            return new ResponseEntity<>(resultMap,HttpStatus.BAD_REQUEST);
        }
        else{
            resultMap.put("result",result);
            resultMap.put("url",resultString);
            return new ResponseEntity<>(resultMap,HttpStatus.OK);
        }
    }
}
