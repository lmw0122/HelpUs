package com.ssafy.helpus.service.Impl;

import com.ssafy.helpus.config.enumClass.DeskCategory;
import com.ssafy.helpus.dto.Desk.DeskListResDto;
import com.ssafy.helpus.dto.Desk.DeskReqDto;
import com.ssafy.helpus.dto.Desk.DeskResDto;
import com.ssafy.helpus.dto.Desk.DeskUpdateReqDto;
import com.ssafy.helpus.model.HelpDesk;
import com.ssafy.helpus.repository.DeskRepository;
import com.ssafy.helpus.repository.MemberRepository;
import com.ssafy.helpus.service.CommentService;
import com.ssafy.helpus.service.FileService;
import com.ssafy.helpus.service.HelpDeskService;
import com.ssafy.helpus.utils.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class HelpDeskServiceImpl implements HelpDeskService {

    private final MemberRepository memberRepository;
    private final DeskRepository deskRepository;

    private final FileService fileService;
    private final CommentService commentService;

    @Override
    public Map<String, Object> registerDesk(DeskReqDto deskDto, int memberId, List<MultipartFile> files) throws Exception {
        log.info("HelpDeskService registerDesk call");

        Map<String, Object> resultMap = new HashMap<>();

        //게시글 저장
        HelpDesk desk = HelpDesk.builder()
                .member(memberRepository.findById(memberId).get())
                .category(DeskCategory.valueOf(deskDto.getCategory()))
                .title(deskDto.getTitle())
                .content(deskDto.getContent())
                .visible(deskDto.getVisible()).build();
        deskRepository.save(desk);

        //게시글 파일 저장
        fileService.deskFileSave(desk, files);

        resultMap.put("message", Message.DESK_REGISTER_SUCCESS);
        resultMap.put("helpDeskId", desk.getHelpDeskId());
        return resultMap;
    }

    @Override
    @Transactional
    public Map<String, Object> updateDesk(DeskUpdateReqDto desk, List<MultipartFile> files) throws Exception {
        log.info("HelpDeskService updateDesk call");

        Map<String, Object> resultMap = new HashMap<>();

        Optional<HelpDesk> helpDesk = deskRepository.findById(desk.getHelpDeskId());
        if(!helpDesk.isPresent()) {
            resultMap.put("message", Message.DESK_NOT_FOUND);
            return resultMap;
        }

        helpDesk.get().setTitle(desk.getTitle());
        helpDesk.get().setContent(desk.getContent());
        helpDesk.get().setCategory(DeskCategory.valueOf(desk.getCategory()));
        helpDesk.get().setVisible(desk.getVisible());
        helpDesk.get().setUpdateDate(LocalDateTime.now());

        //게시글 파일 삭제 후 저장
        if(files != null) {
            fileService.deskFileDelete(helpDesk.get().getHelpDeskImages());
            fileService.deskFileSave(helpDesk.get(), files);
        }
        resultMap.put("message", Message.DESK_UPDATE_SUCCESS);
        return resultMap;
    }

    @Override
    public Map<String, Object> getHelpDesk(Long helpDeskId) throws Exception {
        log.info("HelpDeskService getHelpDesk call");

        Map<String, Object> resultMap = new HashMap<>();

        Optional<HelpDesk> helpDesk = deskRepository.findById(helpDeskId);
        if(!helpDesk.isPresent()) {
            resultMap.put("message", Message.DESK_NOT_FOUND);
            return resultMap;
        }

        DeskResDto desk = DeskResDto.builder()
                .memberId(helpDesk.get().getMember().getMemberId())
                .name(helpDesk.get().getMember().getName())
                .profile(helpDesk.get().getMember().getProfile())
                .email(helpDesk.get().getMember().getEmail())
                .title(helpDesk.get().getTitle())
                .content(helpDesk.get().getContent())
                .category(helpDesk.get().getCategory())
                .visible(helpDesk.get().getVisible())
                .status(helpDesk.get().getStatus())
                .createDate(helpDesk.get().getCreateDate())
                .updateDate(helpDesk.get().getUpdateDate())
                .images(fileService.getDeskFileList(helpDesk.get().getHelpDeskImages()))
                .comments(commentService.getComment(helpDesk.get().getHelpDeskComments())).build();

        resultMap.put("message", Message.DESK_FIND_SUCCESS);
        resultMap.put("desk", desk);
        return resultMap;
    }

    @Override
    public Map<String, Object> helpDeskList(String category, String word, Integer memberId, int page) throws Exception {
        log.info("HelpDeskService helpDeskList call");

        PageRequest pageRequest = PageRequest.of(page, 10, Sort.by("helpDeskId").descending());
        Page<HelpDesk> helpDesks;

        if(memberId!=null) { //작성자별 조회
            helpDesks = deskRepository.findByMember(memberRepository.findById(memberId).get(), pageRequest);
        } else if(category==null && word==null) { //전체 조회
            helpDesks = deskRepository.findAll(pageRequest);
        } else if(category!=null && word==null) { //카테고리 조회
            helpDesks = deskRepository.findByCategory(DeskCategory.valueOf(category), pageRequest);
        } else if(category==null && word!=null) { //전체 검색
            helpDesks = deskRepository.findByContentContainingIgnoreCaseOrTitleContainingIgnoreCase(word, word, pageRequest);
        } else { //카테고리 검색
            helpDesks = deskRepository.findByCategoryAndContentContainingIgnoreCaseOrTitleContainingIgnoreCase(DeskCategory.valueOf(category), word, word, pageRequest);
        }

        return makeList(helpDesks);
    }

    public Map<String, Object> makeList(Page<HelpDesk> helpDesks) {
        log.info("HelpDeskService makeList call");

        Map<String, Object> resultMap = new HashMap<>();

        if(helpDesks.isEmpty()) {
            resultMap.put("message", Message.DESK_NOT_FOUND);
            return resultMap;
        }

        List<DeskListResDto> list = new ArrayList<>();
        for(HelpDesk helpDesk : helpDesks) {
            DeskListResDto deskDto = DeskListResDto.builder()
                    .helpDeskId(helpDesk.getHelpDeskId())
                    .category(helpDesk.getCategory())
                    .memberId(helpDesk.getMember().getMemberId())
                    .name(helpDesk.getMember().getName())
                    .title(helpDesk.getTitle())
                    .createDate(helpDesk.getCreateDate())
                    .visible(helpDesk.getVisible())
                    .status(helpDesk.getStatus()).build();
            list.add(deskDto);
        }

        resultMap.put("message", Message.DESK_FIND_SUCCESS);
        resultMap.put("desk", list);
        resultMap.put("totalPage", helpDesks.getTotalPages());
        return resultMap;
    }
}
