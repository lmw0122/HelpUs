package com.ssafy.helpus.volunteer.service;

import com.ssafy.helpus.volunteer.dto.CommentReqDto;

import java.util.Map;

public interface CommentService {

    Map<String, Object> registerComment(CommentReqDto commentReqDto, Long memberId) throws Exception;

    Map<String, Object> listComment(Long volunteerId, int page) throws Exception;

    Map<String, Object> deleteComment(Long volunteerCommentId) throws Exception;

}
