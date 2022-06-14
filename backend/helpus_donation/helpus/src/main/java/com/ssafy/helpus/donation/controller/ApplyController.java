package com.ssafy.helpus.donation.controller;

import com.ssafy.helpus.donation.dto.Apply.ApplyReqDto;
import com.ssafy.helpus.donation.dto.Apply.WaybillReqDto;
import com.ssafy.helpus.donation.service.ApplyService;
import com.ssafy.helpus.member.service.MemberService;
import com.ssafy.helpus.utils.Message;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/d.apply")
@RequiredArgsConstructor
@CrossOrigin(origins = {"*"}, maxAge = 6000)
public class ApplyController {

    private final ApplyService applyService;
    private final MemberService memberService;

    @ApiOperation(value = "기부 신청")
    @PostMapping
    public ResponseEntity applyDonation (@Valid @RequestBody ApplyReqDto apply,
                                         @RequestHeader HttpHeaders headers) {
        log.info("ApplyController applyDonation call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.CREATED;
        try {
            Long memberId = Long.valueOf(headers.get("memberIdByToken").get(0));
            resultMap = applyService.applyDonation(apply, memberId);

        } catch (Exception e) {
            log.error(Message.DONATION_APPLY_FAIL+" : {}", e.getMessage());

            resultMap.put("message", Message.DONATION_APPLY_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @ApiOperation(value = "운송장 번호 등록")
    @PutMapping
    public ResponseEntity updateWaybill (@Valid @RequestBody WaybillReqDto waybill) {
        log.info("ApplyController updateWaybill call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.CREATED;
        try {
            resultMap = applyService.updateWaybill(waybill);
        } catch (Exception e) {
            log.error(Message.INVOICE_UPDATE_FAIL+" : {}", e.getMessage());

            resultMap.put("message", Message.INVOICE_UPDATE_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @ApiOperation(value = "배송 완료")
    @PutMapping("{donationApplyId}")
    public ResponseEntity deliveryCompleted(@PathVariable Long donationApplyId) {
        log.info("ApplyController deliveryCompleted call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        try {
            resultMap = applyService.deliveryCompleted(donationApplyId);
        } catch (Exception e) {
            log.error(Message.DELIVERY_UPDATE_FAIL+" : {}", e.getMessage());

            resultMap.put("message", Message.DELIVERY_UPDATE_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @ApiOperation(value = "기부 현황 목록 조회")
    @GetMapping("{type}/{memberId}")
    public ResponseEntity applyList (@PathVariable String type,
                                     @PathVariable Long memberId,
                                     @RequestParam(required = false) Long donationId,
                                     @RequestParam(required = false, defaultValue = "1") int page) {
        log.info("ApplyController applyList call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        try {
            String role = memberService.getMemberRole(memberId);
            if(role.equals("USER"))
                resultMap = applyService.userApplyList(memberId, type, page-1);
            else if(role.equals("ORG"))
                resultMap = applyService.orgApplyList(memberId, donationId, type, page-1);
        } catch (Exception e) {
            log.error(Message.APPLY_FIND_FAIL+" : {}", e.getMessage());

            resultMap.put("message", Message.APPLY_FIND_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }
}
