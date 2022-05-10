package com.ssafy.helpus.service.Impl;

import com.ssafy.helpus.config.enumClass.DeskCategory;
import com.ssafy.helpus.dto.Desk.DeskReqDto;
import com.ssafy.helpus.model.HelpDesk;
import com.ssafy.helpus.repository.DeskRepository;
import com.ssafy.helpus.repository.MemberRepository;
import com.ssafy.helpus.service.FileService;
import com.ssafy.helpus.service.HelpDeskService;
import com.ssafy.helpus.utils.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class HelpDeskServiceImpl implements HelpDeskService {

    private final MemberRepository memberRepository;
    private final DeskRepository deskRepository;

    private final FileService fileService;

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
}
