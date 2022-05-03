package com.ssafy.helpus.donation.controller;

import com.ssafy.helpus.donation.dto.Apply.ApplyReqDto;
import com.ssafy.helpus.donation.dto.Apply.WaybillReqDto;
import com.ssafy.helpus.donation.service.ApplyService;
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

    @ApiOperation(value = "기부 글 등록")
    @PostMapping
    public ResponseEntity applyDonation (@Valid @RequestBody ApplyReqDto apply, @RequestHeader HttpHeaders headers) {
        log.info("ApplyController applyDonation call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.CREATED;
        try {
            Long memberId = Long.valueOf(headers.get("memberId").get(0));
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
}
