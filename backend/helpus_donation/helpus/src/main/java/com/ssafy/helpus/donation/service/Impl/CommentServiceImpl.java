package com.ssafy.helpus.donation.service.Impl;

import com.ssafy.helpus.donation.dto.Comment.CommentReqDto;
import com.ssafy.helpus.donation.dto.Comment.CommentResDto;
import com.ssafy.helpus.donation.entity.Comment;
import com.ssafy.helpus.donation.enumClass.CommentStatus;
import com.ssafy.helpus.donation.repository.CommentRepository;
import com.ssafy.helpus.donation.service.CommentService;
import com.ssafy.helpus.member.service.MemberService;
import com.ssafy.helpus.utils.Message;
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
    public Map<String, Object> registerComment(CommentReqDto commentDto, Long memberId) throws Exception {
        log.info("DonationService registerDonation call");

        Map<String, Object> resultMap = new HashMap<>();

        Long boardId = commentDto.getBoardId();
        Long parentId = commentDto.getParentCommentId();
        CommentStatus category = CommentStatus.valueOf(commentDto.getCategory());
        int group = 0, depth = 0;

        if(parentId == null) {
            List<Comment> comments = commentRepository.findByBoardIdAndCategoryAndDepthOrderByCommentGroupDesc(boardId, category, 0);
            if(!comments.isEmpty()) {
                group = comments.get(0).getCommentGroup();
            }
            group++;
        }else {
            group = commentRepository.findById(parentId).get().getCommentGroup();
            depth = commentRepository.findTopByBoardIdAndCategoryAndCommentGroupOrderByDepthDesc(boardId, category, group).get().getDepth() +1;
        }

        Comment comment = Comment.builder()
                .boardId(boardId)
                .category(category)
                .memberId(memberId)
                .content(commentDto.getContent())
                .parentCommentId(parentId)
                .commentGroup(group)
                .depth(depth).build();

        commentRepository.save(comment);

        resultMap.put("message", Message.COMMENT_REGISTER_SUCCESS);
        resultMap.put("content", commentDto.getContent());
        return resultMap;
    }

    @Override
    @Transactional
    public Map<String, Object> deleteComment(Long commentId) throws Exception {
        log.info("DonationService deleteComment call");

        Map<String, Object> resultMap = new HashMap<>();
        Optional<Comment> comment = commentRepository.findById(commentId);
        if(!comment.isPresent()) {
            resultMap.put("message", Message.COMMENT_NOT_FOUND);
            return resultMap;
        }

        if(comment.get().getParentCommentId()==null) {
            commentRepository.deleteById(commentId);
        }else {
            comment.get().setContent("삭제된 댓글입니다.");
        }

        resultMap.put("message", Message.COMMENT_DELETE_SUCCESS);
        return resultMap;
    }

    @Override
    public Map<String, Object> listComment(String category, Long boardId, int page) throws Exception {
        log.info("DonationService deleteComment call");

        Map<String, Object> resultMap = new HashMap<>();
        Page<Comment> comments = commentRepository.findByBoardIdAndCategoryOrderByCommentGroupDescDepth(boardId, CommentStatus.valueOf(category), PageRequest.of(page, 20));
        if(comments.isEmpty()) {
            resultMap.put("message", Message.COMMENT_NOT_FOUND);
            return resultMap;
        }

        List<CommentResDto> list = new ArrayList<>();
        for(Comment comment : comments) {
            Map<String, String> member = memberService.getMember(comment.getMemberId());

            Long parentId = null;
            String parentName = null;
            if(comment.getParentCommentId() != null) {
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

        resultMap.put("message", Message.COMMENT_FIND_SUCCESS);
        resultMap.put("comment", list);
        resultMap.put("totalPage", comments.getTotalPages());
        return resultMap;
    }
}
