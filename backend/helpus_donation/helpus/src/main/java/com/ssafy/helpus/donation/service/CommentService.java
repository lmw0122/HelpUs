package com.ssafy.helpus.donation.service;

import com.ssafy.helpus.donation.dto.Comment.CommentReqDto;

import java.util.Map;

public interface CommentService {
    //댓글 등록
    Map<String, Object> registerComment(CommentReqDto commentDto, Long memberId) throws Exception;
}
