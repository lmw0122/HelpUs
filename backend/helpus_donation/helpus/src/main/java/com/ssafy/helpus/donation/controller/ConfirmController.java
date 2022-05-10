package com.ssafy.helpus.donation.controller;

import com.ssafy.helpus.donation.dto.Confirm.ConfirmReqDto;
import com.ssafy.helpus.donation.dto.Confirm.ConfirmUpdateReqDto;
import com.ssafy.helpus.donation.service.ConfirmService;
import com.ssafy.helpus.donation.service.FileService;
import com.ssafy.helpus.utils.Message;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
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
    public ResponseEntity registerConfirm(@Valid @RequestPart ConfirmReqDto confirm, @RequestPart List<MultipartFile> files,
                                          @RequestHeader HttpHeaders headers) {
        log.info("ConfirmController registerConfirm call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.CREATED;
        try {
            //게시글 파일 확장자 확인
            if(!fileService.fileExtensionCheck(files)) {
                resultMap.put("message", Message.FILE_EXTENSION_EXCEPTION);
                status = HttpStatus.BAD_REQUEST;
            } else {
                Long memberId = Long.valueOf(headers.get("memberId").get(0));
                resultMap = confirmService.registerConfirm(confirm, memberId, files);
            }
        } catch (Exception e) {
            log.error(Message.CONFIRM_REGISTER_FAIL+" : {}", e.getMessage());

            resultMap.put("message", Message.CONFIRM_REGISTER_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @ApiOperation(value = "후기 글 수정")
    @PutMapping
    public ResponseEntity updateConfirm(@Valid @RequestPart ConfirmUpdateReqDto confirm, @RequestPart List<MultipartFile> files) {
        log.info("ConfirmController updateConfirm call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.CREATED;
        try {
            //게시글 파일 확장자 확인
            if(!fileService.fileExtensionCheck(files)) {
                resultMap.put("message", Message.FILE_EXTENSION_EXCEPTION);
                status = HttpStatus.BAD_REQUEST;
            } else {
                resultMap = confirmService.updateConfirm(confirm, files);
            }
        } catch (Exception e) {
            log.error(Message.CONFIRM_UPDATE_FAIL+" : {}", e.getMessage());

            resultMap.put("message", Message.CONFIRM_UPDATE_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @ApiOperation(value = "후기 글 조회")
    @GetMapping("{donationConfirmId}")
    public ResponseEntity getConfirm(@PathVariable Long donationConfirmId) {
        log.info("ConfirmController getConfirm call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        try {
            resultMap = confirmService.getConfirm(donationConfirmId);
        } catch (Exception e) {
            log.error(Message.CONFIRM_FIND_FAIL+" : {}", e.getMessage());

            resultMap.put("message", Message.CONFIRM_FIND_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @ApiOperation(value = "후기 목록")
    @GetMapping
    public ResponseEntity confirmList(@RequestParam(required = false) Long memberId,
                                      @RequestParam(required = false, defaultValue = "1") int page) {
        log.info("ConfirmController confirmList");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        try {
            resultMap = confirmService.confirmList(memberId, page-1);
        } catch (Exception e) {
            log.error(Message.CONFIRM_FIND_FAIL+" : {}", e.getMessage());

            resultMap.put("message", Message.CONFIRM_FIND_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }
}
