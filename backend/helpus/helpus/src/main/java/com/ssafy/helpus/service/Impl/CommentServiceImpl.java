package com.ssafy.helpus.service.Impl;

import com.ssafy.helpus.dto.CommentDto;
import com.ssafy.helpus.dto.Desk.DeskCommentResDto;
import com.ssafy.helpus.dto.Member.MemberDto;
import com.ssafy.helpus.model.HelpDeskComment;
import com.ssafy.helpus.model.Member;
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
        MemberDto member = memberService.getMemberById(memberId);
        Member m = Member.builder()
                .memberId(member.getMemberId())
                .address(member.getAddress())
                .createDate(member.getCreateDate())
                .email(member.getEmail())
                .info(member.getInfo())
                .name(member.getName())
                .orgZipcode(member.getOrgZipcode())
                .password(member.getPassword())
                .profile(member.getProfile())
                .registration(member.getRegistration())
                .tel(member.getTel())
                .warnCount(member.getWarnCount())
                .role(member.getRole()).build();
        HelpDeskComment comment = HelpDeskComment.builder()
                .member(m)
                .content(commentDto.getContent())
                .helpDesk(deskRepository.findById(commentDto.getHelpDeskId()).get()).build();

        commentRepository.save(comment);

        comment.getHelpDesk().setStatus("등록");

        resultMap.put("message", Message.COMMENT_REGISTER_SUCCESS);
        resultMap.put("content", commentDto.getContent());
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

        commentRepository.deleteById(commentId);

        if(!commentRepository.existsByHelpDesk(comment.get().getHelpDesk())) {
            comment.get().getHelpDesk().setStatus("미등록");
        }

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
