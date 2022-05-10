package com.ssafy.helpus.controller;

import com.ssafy.helpus.dto.Desk.DeskReqDto;
import com.ssafy.helpus.dto.Desk.DeskUpdateReqDto;
import com.ssafy.helpus.service.FileService;
import com.ssafy.helpus.service.HelpDeskService;
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
@RequestMapping("/desk")
@RequiredArgsConstructor
@CrossOrigin(origins = {"*"}, maxAge = 6000)
public class HelpDeskController {

    private final HelpDeskService helpDeskService;
    private final FileService fileService;

    @ApiOperation(value = "고객센터 글 등록")
    @PostMapping
    public ResponseEntity registerDesk(@Valid @RequestPart DeskReqDto desk, @RequestPart List<MultipartFile> files,
                                       @RequestHeader HttpHeaders headers) {
        log.info("HelpDeskController registerDesk call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.CREATED;
        try {
            //게시글 파일 확장자 확인
            if(!fileService.fileExtensionCheck(files)) {
                resultMap.put("message", Message.FILE_EXTENSION_EXCEPTION);
                status = HttpStatus.BAD_REQUEST;
            } else {
                int memberId = Integer.parseInt((headers.get("memberId").get(0)));
                resultMap = helpDeskService.registerDesk(desk, memberId, files);
            }
        } catch (Exception e) {
            log.error(Message.DESK_REGISTER_FAIL+" : {}", e.getMessage());

            resultMap.put("message", Message.DESK_REGISTER_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @ApiOperation(value = "고객센터 글 수정")
    @PutMapping
    public ResponseEntity updateDesk(@Valid @RequestPart DeskUpdateReqDto desk,
                                     @RequestPart(required = false) List<MultipartFile> files) {
        log.info("HelpDeskController updateDesk call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.CREATED;
        try {
            //게시글 파일 확장자 확인
            if(files != null && !fileService.fileExtensionCheck(files)) {
                resultMap.put("message", Message.FILE_EXTENSION_EXCEPTION);
                status = HttpStatus.BAD_REQUEST;
            } else {
                resultMap = helpDeskService.updateDesk(desk, files);
            }
        } catch (Exception e) {
            log.error(Message.DESK_UPDATE_FAIL+" : {}", e.getMessage());

            resultMap.put("message", Message.DESK_UPDATE_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }
}
