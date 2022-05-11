package com.ssafy.helpus.service.Impl;

import com.ssafy.helpus.dto.CommentDto;
import com.ssafy.helpus.dto.Desk.DeskCommentResDto;
import com.ssafy.helpus.model.HelpDeskComment;
import com.ssafy.helpus.repository.CommentRepository;
import com.ssafy.helpus.repository.DeskRepository;
import com.ssafy.helpus.service.CommentService;
import com.ssafy.helpus.service.MemberService;
import com.ssafy.helpus.utils.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final DeskRepository deskRepository;
    private final CommentRepository commentRepository;

    private final MemberService memberService;

    @Override
    @Transactional
    public Map<String, Object> registerComment(CommentDto commentDto, int memberId) throws Exception {
        log.info("CommentService registerComment call");

        Map<String, Object> resultMap = new HashMap<>();

        HelpDeskComment comment = HelpDeskComment.builder()
                .member(memberService.getMemberById(memberId))
                .content(commentDto.getContent())
                .helpDesk(deskRepository.findById(commentDto.getHelpDeskId()).get()).build();

        commentRepository.save(comment);

        comment.getHelpDesk().setStatus("등록");

        resultMap.put("message", Message.COMMENT_REGISTER_SUCCESS);
        return resultMap;
    }

    @Override
    @Transactional
    public Map<String, Object> deleteComment(Long commentId) throws Exception {
        log.info("CommentService deleteComment call");

        Map<String, Object> resultMap = new HashMap<>();
        Optional<HelpDeskComment> comment = commentRepository.findById(commentId);
        if(!comment.isPresent()) {
            resultMap.put("message", Message.COMMENT_NOT_FOUND);
            return resultMap;
        }

        if(comment.get().getHelpDesk().getHelpDeskComments().size()==1)
            comment.get().getHelpDesk().setStatus("미등록");
        commentRepository.deleteById(commentId);

        resultMap.put("message", Message.COMMENT_DELETE_SUCCESS);
        return resultMap;
    }

    @Override
    public List<DeskCommentResDto> getComment(List<HelpDeskComment> comments) {
        List<DeskCommentResDto> list = new ArrayList<>();
        for(HelpDeskComment comment : comments) {
            DeskCommentResDto deskDto = DeskCommentResDto.builder()
                    .memberId(comment.getMember().getMemberId())
                    .name(comment.getMember().getName())
                    .profile(comment.getMember().getProfile())
                    .content(comment.getContent())
                    .createDate(comment.getCreateDate()).build();
            list.add(deskDto);
        }
        return list;
    }
}
