package com.ssafy.helpus.donation.service.Impl;

import com.ssafy.helpus.donation.dto.Confirm.ConfirmReqDto;
import com.ssafy.helpus.donation.dto.Confirm.ConfirmUpdateReqDto;
import com.ssafy.helpus.donation.entity.DonationConfirm;
import com.ssafy.helpus.donation.repository.DonationConfirmRepository;
import com.ssafy.helpus.donation.service.ConfirmService;
import com.ssafy.helpus.donation.service.FileService;
import com.ssafy.helpus.utils.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ConfirmServiceImpl implements ConfirmService {

    private final FileService fileService;

    private final DonationConfirmRepository confirmRepository;

    @Override
    public Map<String, Object> registerConfirm(ConfirmReqDto confirmDto, List<MultipartFile> files) throws Exception {
        log.info("ConfirmService registerConfirm call");

        Map<String, Object> resultMap = new HashMap<>();

        //게시글 저장
        DonationConfirm confirm = DonationConfirm.builder()
                .donationId(confirmDto.getDonationId())
                .memberId(confirmDto.getMemberId())
                .title(confirmDto.getTitle())
                .content(confirmDto.getContent()).build();
        confirmRepository.save(confirm);

        //게시글 파일 저장
        fileService.confirmFileSave(confirm, files);

        resultMap.put("message", Message.CONFIRM_REGISTER_SUCCESS);
        resultMap.put("boardId", confirm.getDonationConfirmId());

        return resultMap;
    }

    @Override
    @Transactional
    public Map<String, Object> updateConfirm(ConfirmUpdateReqDto confirmDto, List<MultipartFile> files) throws Exception {
        log.info("ConfirmService updateConfirm call");

        Map<String, Object> resultMap = new HashMap<>();

        Optional<DonationConfirm> confirm = confirmRepository.findById(confirmDto.getDonationConfirmId());
        if(!confirm.isPresent()) {
            resultMap.put("message", Message.CONFIRM_NOT_FOUND);
            return resultMap;
        }
        confirm.get().setTitle(confirmDto.getTitle());
        confirm.get().setContent(confirmDto.getContent());
        confirm.get().setUpdateDate(LocalDateTime.now());
        System.out.println(confirm.get().getImages().isEmpty());

        //게시글 파일 삭제 후 저장
        fileService.confirmFileDelete(confirm.get().getImages());
        fileService.confirmFileSave(confirm.get(), files);

        resultMap.put("message", Message.CONFIRM_UPDATE_SUCCESS);
        return resultMap;
    }
}
