package com.ssafy.helpus.volunteer.controller;

import com.ssafy.helpus.volunteer.dto.TalentDonationReqDto;
import com.ssafy.helpus.volunteer.dto.TalentDonationUpdateReqDto;
import com.ssafy.helpus.volunteer.service.FileService;
import com.ssafy.helpus.volunteer.service.TalentDonationService;
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
@RequestMapping("/talentDonation")
@CrossOrigin(origins = {"*"}, maxAge = 6000)
public class TalentDonationController {

    private final TalentDonationService talentDonationService;
    private final FileService fileService;
    private final VolunteerService volunteerService;


    @ApiOperation(value = "재능기부 글 등록")
    @PostMapping
    public ResponseEntity registerTalentDonation(@RequestPart TalentDonationReqDto talentDonationReqDto, @RequestPart(required = false) MultipartFile[] files,
                                                 @RequestHeader HttpHeaders headers){
        log.info("TalentDonationController registerTalentDonation call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.CREATED;
        try {
                Long memberId = Long.valueOf(headers.get("memberIdByToken").get(0));
                String role = headers.get("role").get(0);
                resultMap = talentDonationService.registerTalentDonation(talentDonationReqDto, memberId, files, role);
        } catch (Exception e){
            log.error(e.getMessage());
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @ApiOperation(value = "재능기부 글 수정")
    @PutMapping
    public ResponseEntity updateTalentDonation(@RequestPart TalentDonationUpdateReqDto talentDonationUpdateReqDto, @RequestPart(required = false) MultipartFile[] files,
                                               @RequestHeader HttpHeaders headers){
        log.info("TalentDonationController updateTalentDonation call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.CREATED;
        try {
                Long memberId = Long.valueOf(headers.get("memberId").get(0));
                String role = headers.get("role").get(0);
                resultMap = talentDonationService.updateTalentDonation(talentDonationUpdateReqDto, memberId, files, role);

        } catch (Exception e){
            log.error(e.getMessage());
            resultMap.put("message", "봉사글 수정 실패");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @ApiOperation(value = "재능기부 글 조회")
    @GetMapping("{volunteerId}")
    public ResponseEntity getTalentDonation(@PathVariable Long volunteerId){
        log.info("TalentDonationController getTalentDonation call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        try {
            resultMap = talentDonationService.getTalentDonation(volunteerId);
        } catch (Exception e){
            log.error(e.getMessage());
            resultMap.put("message", "error");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }
    @ApiOperation(value = "재능기부 글 삭제")
    @DeleteMapping("{volunteerId}")
    public ResponseEntity deleteTalentDonation(@PathVariable Long  volunteerId){
        log.info("TalentDonationController deleteTalentDonation call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        try {
            resultMap = talentDonationService.deleteTalentDonation(volunteerId);
        }catch (Exception e){
            log.error(e.getMessage());

            resultMap.put("message", "삭제 실패");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @ApiOperation(value = "재능기부 글 목록")
    @GetMapping("/")
    public ResponseEntity listVolunteer(@RequestParam(defaultValue = "1") int page){

        log.info("TalentDonationController listVolunteer call");
        String category = "USER";

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            resultMap = talentDonationService.listTalenDonation(category, page-1);
        }catch (Exception e){
            log.info(e.getMessage());
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @ApiOperation(value = "재능기부 글 목록 정렬")
    @GetMapping("/main")
    public ResponseEntity mainListTalentDonation(@RequestParam(required = false,defaultValue = "최신순") String order, @RequestParam(required = false, defaultValue = "1") int page){
        log.info("TalentDonationController mainListTalentDonation call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        try {
            resultMap = talentDonationService.mainListTalentDonation(order, page-1);
        }catch (Exception e){
            log.error(e.getMessage());

            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @ApiOperation(value = "내가 올린 재능기부 글 목록")
    @GetMapping("/mylist/{memberId}")
    public ResponseEntity myTalentDonationList(@PathVariable Long memberId, @RequestParam(required = false, defaultValue = "1") int page){
        log.info("TalentDonationController myTalentDonationList call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        try {
            resultMap = talentDonationService.myTalentDonationList(memberId, page-1);
        }catch (Exception e){
            log.info(e.getMessage());
            resultMap.put("message", "조회 실패");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @ApiOperation(value = "검색")
    @GetMapping("/search/{keyword}")
    public ResponseEntity searchTalentDonationList(@PathVariable String keyword, @RequestParam(required = false, defaultValue = "1") int page){
        log.info("TalentDonationController searchTalentDonationList");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;

        try {
            resultMap = talentDonationService.searchTalentDonationList(keyword, page-1);
        }catch (Exception e){
            log.error(e.getMessage());

            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity(resultMap, status);

    }

}
