package com.ssafy.helpus.donation.controller;

import com.ssafy.helpus.donation.dto.Confirm.ConfirmReqDto;
import com.ssafy.helpus.donation.service.ConfirmService;
import com.ssafy.helpus.donation.service.FileService;
import com.ssafy.helpus.utils.Message;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/d.confirm")
@RequiredArgsConstructor
@CrossOrigin(origins = {"*"}, maxAge = 6000)
public class ConfirmController {

    private final FileService fileService;
    private final ConfirmService confirmService;

    @ApiOperation(value = "후기 글 등록")
    @PostMapping
    public ResponseEntity registerConfirm(@Valid @RequestPart ConfirmReqDto confirm, @RequestPart List<MultipartFile> files) {
        log.info("ConfirmController registerConfirm call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.CREATED;
        try {
            //게시글 파일 확장자 확인
            if(!fileService.fileExtensionCheck(files)) {
                resultMap.put("message", Message.FILE_EXTENSION_EXCEPTION);
                status = HttpStatus.BAD_REQUEST;
            } else {
                resultMap = confirmService.registerConfirm(confirm, files);
            }
        } catch (Exception e) {
            log.error(Message.CONFIRM_REGISTER_FAIL+" : {}", e.getMessage());

            resultMap.put("message", Message.CONFIRM_REGISTER_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }
}
