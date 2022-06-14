package com.ssafy.helpus.donation.controller;

import java.util.HashMap;
import java.util.Map;

import com.ssafy.helpus.donation.service.NaverSearchService;
import com.ssafy.helpus.utils.Message;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/news")
@CrossOrigin(origins = {"*"}, maxAge = 6000)
public class NewsController {

    private final NaverSearchService naverSearchService;

    @ApiOperation(value = "기부 뉴스 목록")
    @GetMapping
    public ResponseEntity getNews(@RequestParam(defaultValue = "1") Integer page) throws Exception {
        log.debug("NewsController getNews call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            resultMap = naverSearchService.getNews(page);
            if(resultMap.get("message").equals(Message.FIND_NEWS_SUCCESS)) {
                status = HttpStatus.OK;
            }
        } catch (Exception e) {
            log.error(Message.FIND_NEWS_FAIL+": {}", e.getMessage());

            resultMap.put("message", Message.FIND_NEWS_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }
}