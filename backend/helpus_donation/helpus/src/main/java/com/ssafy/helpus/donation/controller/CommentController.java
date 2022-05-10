package com.ssafy.helpus.donation.controller;

import com.ssafy.helpus.donation.dto.Comment.CommentReqDto;
import com.ssafy.helpus.donation.service.CommentService;
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
@RequestMapping("/d.comment")
@RequiredArgsConstructor
@CrossOrigin(origins = {"*"}, maxAge = 6000)
public class CommentController {

    private final CommentService commentService;

    @ApiOperation(value = "댓글 등록")
    @PostMapping
    public ResponseEntity registerComment(@Valid @RequestBody CommentReqDto comment,
                                          @RequestHeader HttpHeaders headers) {
        log.info("CommentController registerComment call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.CREATED;
        try {
            Long memberId = Long.valueOf(headers.get("memberId").get(0));
            resultMap = commentService.registerComment(comment, memberId);
        } catch (Exception e) {
            log.error(Message.COMMENT_REGISTER_FAIL+" : {}", e.getMessage());

            resultMap.put("message", Message.COMMENT_REGISTER_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @ApiOperation(value = "댓글 삭제")
    @DeleteMapping("{commentId}")
    public ResponseEntity deleteComment(@PathVariable Long commentId) {
        log.info("CommentController deleteComment call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        try {
            resultMap = commentService.deleteComment(commentId);
        } catch (Exception e) {
            log.error(Message.COMMENT_DELETE_FAIL+" : {}", e.getMessage());

            resultMap.put("message", Message.COMMENT_DELETE_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @ApiOperation(value = "댓글 조회")
    @GetMapping("{category}/{boardId}")
    public ResponseEntity listComment(@PathVariable String category, @PathVariable Long boardId,
                                      @RequestParam(required = false, defaultValue = "1") int page) {
        log.info("CommentController listComment call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        try {
            resultMap = commentService.listComment(category, boardId, page-1);
        } catch (Exception e) {
            log.error(Message.COMMENT_FIND_FAIL+" : {}", e.getMessage());

            resultMap.put("message", Message.COMMENT_FIND_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }
}
