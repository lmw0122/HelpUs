package com.ssafy.helpus.volunteer.controller;

import com.ssafy.helpus.volunteer.dto.CommentReqDto;
import com.ssafy.helpus.volunteer.service.CommentService;
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
@RequestMapping("/v.comment")
@RequiredArgsConstructor
@CrossOrigin(origins = {"*"}, maxAge = 6000)
public class CommeentController {

    private final CommentService commentService;

    @ApiOperation(value = "댓글 등록")
    @PostMapping
    public ResponseEntity registerComment(@Valid @RequestBody CommentReqDto commentReqDto,
                                          @RequestHeader HttpHeaders headers) {
        log.info("CommentController registerComment call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.CREATED;
        try {
            Long memberId = Long.valueOf(headers.get("memberIdByToken").get(0));
            resultMap = commentService.registerComment(commentReqDto, memberId);
        } catch (Exception e) {
            log.error(e.getMessage());
            resultMap.put("message", "댓글 등록 실패");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @ApiOperation(value = "댓글 조회")
    @GetMapping("/{volunteerId}")
    public ResponseEntity listComment(@PathVariable Long volunteerId, @RequestParam(required = false, defaultValue = "1") int page) {
        log.info("CommentController listComment call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        try {
            resultMap = commentService.listComment(volunteerId, page-1);
        } catch (Exception e) {
            log.error(e.getMessage());

            resultMap.put("message", "댓글 조회 실패");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @ApiOperation(value = "댓글 삭제")
    @DeleteMapping("{commentId}")
    public ResponseEntity deleteComment(@PathVariable Long commentId){
        log.info("CommentController deleteComment call");

        Map<String, Object> resultMap = new HashMap<>();

        HttpStatus status = HttpStatus.OK;
        try {
            resultMap = commentService.deleteComment(commentId);
        }catch (Exception e){
            log.error(e.getMessage());
            resultMap.put("message", "댓글 삭제 실패");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

}
