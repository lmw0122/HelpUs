package com.ssafy.helpus.volunteer.controller;

import com.ssafy.helpus.volunteer.dto.VolunteerReqDto;
import com.ssafy.helpus.volunteer.dto.VolunteerUpdateReqDto;
import com.ssafy.helpus.volunteer.service.FileService;
import com.ssafy.helpus.volunteer.service.VolunteerService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/volunteer")
@CrossOrigin(origins = {"*"}, maxAge = 6000)
public class VolunteerController {

    private final VolunteerService volunteerService;
    private final FileService fileService;


    @ApiOperation(value = "봉사 글 등록")
    @PostMapping
    public ResponseEntity registerVolunteer(@RequestPart VolunteerReqDto volunteerReqDto, @RequestPart(required = false) MultipartFile[] files,
                                            @RequestHeader HttpHeaders headers){
        log.info("VolunteerController registerVolunteer call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.CREATED;
        try {
                Long memberId = Long.valueOf(headers.get("memberIdByToken").get(0));
                String role = headers.get("role").get(0);
                resultMap = volunteerService.registerVoluneer(volunteerReqDto, memberId, files, role);
        } catch (Exception e){
            log.error(e.getMessage());
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @ApiOperation(value = "봉사 글 수정")
    @PutMapping
    public ResponseEntity updateVolunteer(@RequestPart VolunteerUpdateReqDto volunteerUpdateReqDto, @RequestPart(required = false) MultipartFile[] files,
                                          @RequestHeader HttpHeaders headers){
        log.info("VolunteerController updateVolunteer call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.CREATED;
        try {
                Long memberId = Long.valueOf(headers.get("memberId").get(0));
                String role = headers.get("role").get(0);
                resultMap = volunteerService.updateVolunteer(volunteerUpdateReqDto, memberId, files, role);
        } catch (Exception e){
            log.error(e.getMessage());
            resultMap.put("message", "봉사글 수정 실패");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @ApiOperation(value = "봉사 글 조회")
    @GetMapping("{volunteerId}")
    public ResponseEntity getVolunteer(@PathVariable Long volunteerId){
        log.info("VolunteerController getVolunteer call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        try {
            resultMap = volunteerService.getVoluneer(volunteerId);
        } catch (Exception e){
            log.error(e.getMessage());
            resultMap.put("message", "error");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @ApiOperation(value = "봉사 참석여부 파악")
    @GetMapping("/apply/{volunteerId}")
    public ResponseEntity getApplyStatus(@PathVariable Long volunteerId, @RequestHeader HttpHeaders headers){
        log.info("VolunteerController getApplyStatus call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        try {
            Long memberId = Long.valueOf(headers.get("memberIdByToken").get(0));
            resultMap = volunteerService.getApplyStatus(volunteerId, memberId);
        } catch (Exception e){
            log.error(e.getMessage());
            resultMap.put("message", "error");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @ApiOperation(value = "봉사 글 삭제")
    @DeleteMapping("{volunteerId}")
    public ResponseEntity deleteVolunteer(@PathVariable Long  volunteerId){
        log.info("VolunteerController deleteVolunteer call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        try {
            resultMap = volunteerService.deleteVolunteer(volunteerId);
        }catch (Exception e){
            log.error(e.getMessage());

            resultMap.put("message", "실패");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }


    @ApiOperation(value = "봉사 글 마감")
    @DeleteMapping("end/{volunteerId}")
    public ResponseEntity endVolunteer(@PathVariable Long volunteerId){
        log.info("VolunteerController endVolunteer call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        try {
            resultMap = volunteerService.endVolunteer(volunteerId);
        }catch (Exception e){
            log.error(e.getMessage());

            resultMap.put("Message", "실패");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @ApiOperation(value = "봉사신청")
    @PutMapping("/apply/{volunteerId}")
    public ResponseEntity applyVolunteer(@PathVariable Long volunteerId, @RequestHeader HttpHeaders headers){
        log.info("VolunteerController applyVolunteer call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;

        try {
            Long memberId = Long.valueOf(headers.get("memberIdByToken").get(0));
            String role = headers.get("role").get(0);
            resultMap = volunteerService.applyVolunteer(volunteerId, memberId, role);
        }catch (Exception e){
            log.error(e.getMessage());
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @GetMapping("/")
    public ResponseEntity listVolunteer(@RequestParam(required = false,defaultValue = "최신순") String order,@RequestParam(defaultValue = "1") int page){

        log.info("VolunteerController listVolunteer call");
        String category = "ORG";

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            resultMap = volunteerService.listVolunteer(category, order, page-1);
        }catch (Exception e){
            log.info(e.getMessage());
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    //4
    @ApiOperation(value = "봉사 목록 메인페이지에 나오는거")
    @GetMapping("/main")
    public ResponseEntity mainListVolunteer(@RequestParam(required = false,defaultValue = "최신순") String order, @RequestParam(required = false, defaultValue = "1") int page){
        log.info("VolunteerController mainListVolunteer call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        try {
            resultMap = volunteerService.mainListVolunteer(order, page-1);
        }catch (Exception e){
            log.error(e.getMessage());

            resultMap.put("message", "실패");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @ApiOperation(value = "기업입장에서 내가 올린 봉사목록")
    @GetMapping("/mylist/{memberId}")
    public ResponseEntity myVolunteerList(@PathVariable Long memberId, @RequestParam(required = false, defaultValue = "1") int page, @RequestParam int status){
        log.info("VolunteerController myVolunteerList call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus stat = HttpStatus.OK;
        try {
            resultMap = volunteerService.myVolunteerList(memberId, page-1, status);
        }catch (Exception e){
            log.error(e.getMessage());

            resultMap.put("message", "게시물 조회 실패");
            stat = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, stat);
    }

    @ApiOperation(value = "내가 봉사한 봉사목록")
    @GetMapping("/doVolunteer/{memberId}")
    public ResponseEntity doVolunteerList(@PathVariable Long memberId, @RequestParam(required = false, defaultValue = "1") int page){
        log.info("VolunteerController doVolunteerList call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus stat = HttpStatus.OK;
        try {
            resultMap = volunteerService.doVolunteerList(memberId, page-1);
        }catch (Exception e){
            log.error(e.getMessage());

            resultMap.put("message", e.getMessage());
            stat = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, stat);
    }

    @ApiOperation(value = "봉사목록 한번에")
    @GetMapping("/myVolunteerList/{memberId}")
    public ResponseEntity myVolList(@PathVariable Long memberId){

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        try {
            resultMap = volunteerService.myVolList(memberId);
        }catch (Exception e){
            log.error(e.getMessage());
            resultMap.put("message", "실패");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

}
