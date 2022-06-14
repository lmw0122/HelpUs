package com.ssafy.helpus.volunteer.service.Impl;

import com.ssafy.helpus.volunteer.dto.CommentReqDto;
import com.ssafy.helpus.volunteer.dto.CommentResDto;
import com.ssafy.helpus.volunteer.entity.Comment;
import com.ssafy.helpus.volunteer.repository.CommentRepository;
import com.ssafy.helpus.volunteer.service.CommentService;
import com.ssafy.helpus.volunteer.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final MemberService memberService;

    @Override
    public Map<String, Object> registerComment(CommentReqDto commentReqDto, Long memberId) throws Exception {
        log.info("CommentService registerComment call");

        Map<String, Object> resultMap = new HashMap<>();

        Long volunteerId = commentReqDto.getVolunteerId();
        Long parentCommentId = commentReqDto.getParentCommentId();

        int commentGroup = 0;
        int depth = 0;

        if(parentCommentId != null){
            Optional<Comment> op_comment = commentRepository.findById(parentCommentId);
            commentGroup = op_comment.get().getCommentGroup();
            depth = op_comment.get().getDepth()+1;

            Comment comment = Comment.builder()
                    .memberId(memberId)
                    .parentCommentId(parentCommentId)
                    .content(commentReqDto.getContent())
                    .volunteerId(volunteerId)
                    .commentGroup(commentGroup)
                    .depth(depth)
                    .build();
            commentRepository.save(comment);

            resultMap.put("message", commentReqDto.getContent());
            return resultMap;
        }
        else{
            List<Comment> comments = commentRepository.findByVolunteerIdOrderByCommentGroupDesc(volunteerId);
            if(!comments.isEmpty()){
                commentGroup = comments.get(0).getCommentGroup();
            }
            commentGroup++;

            Comment comment = Comment.builder()
                    .memberId(memberId)
                    .content(commentReqDto.getContent())
                    .volunteerId(volunteerId)
                    .commentGroup(commentGroup)
                    .depth(depth)
                    .build();
            commentRepository.save(comment);

            resultMap.put("message", commentReqDto.getContent());
            return resultMap;
        }
    }

    @Override
    public Map<String, Object> listComment(Long volunteerId, int page) throws Exception {
        log.info("CommentService listComment call");

        Map<String, Object> resultMap = new HashMap<>();
        Page<Comment> comments = commentRepository.findByVolunteerIdOrderByCommentGroupDescDepth(volunteerId, PageRequest.of(page, 20));
        if(comments.isEmpty()){
            resultMap.put("message", "댓글없음");
            return resultMap;
        }

        List<CommentResDto> list = new ArrayList<>();
        for(Comment comment : comments){
            Map<String, String> member = memberService.getMember(comment.getMemberId());

            Long parentId = null;
            String parentName = null;

            if(comment.getParentCommentId() != null){
                Optional<Comment> parent = commentRepository.findById(comment.getParentCommentId());
                parentId = parent.get().getMemberId();
                parentName = memberService.getMemberName(parentId);
            }

            CommentResDto commentResDto = CommentResDto.builder()
                    .commentId(comment.getCommentId())
                    .memberId(comment.getMemberId())
                    .name(member.get("name"))
                    .profile(member.get("profile"))
                    .content(comment.getContent())
                    .createDate(comment.getCreateDate())
                    .parentId(parentId)
                    .parentName(parentName).build();
            list.add(commentResDto);
        }

        resultMap.put("message", "조회성공");
        resultMap.put("comment", list);
        resultMap.put("totalPage", comments.getTotalPages());
        return resultMap;
    }

    @Override
    @Transactional
    public Map<String, Object> deleteComment(Long commentId) throws Exception {
        log.info("CommentService deleteComment call");

        Map<String, Object> resultMap = new HashMap<>();
        Optional<Comment> comment = commentRepository.findById(commentId);
        if(!comment.isPresent()){
            resultMap.put("message", "해당 댓글 없음");
            return resultMap;
        }

            commentRepository.deleteById(commentId);

        resultMap.put("message", "삭제 성공");
        return resultMap;
    }
}
