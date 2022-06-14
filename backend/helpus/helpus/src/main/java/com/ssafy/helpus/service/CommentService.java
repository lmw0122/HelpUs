package com.ssafy.helpus.service;

import com.ssafy.helpus.dto.CommentDto;
import com.ssafy.helpus.dto.Desk.DeskCommentResDto;
import com.ssafy.helpus.model.HelpDeskComment;

import java.util.List;
import java.util.Map;

public interface CommentService {
    //댓글 등록
    Map<String, Object> registerComment(CommentDto commentDto, int memberId) throws Exception;
    //댓글 삭제
    Map<String, Object> deleteComment(Long commentId) throws Exception;
    //댓글 조회
    List<DeskCommentResDto> getComment(List<HelpDeskComment> comments);
}
