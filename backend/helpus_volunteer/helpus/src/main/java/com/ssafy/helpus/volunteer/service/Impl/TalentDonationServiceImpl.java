package com.ssafy.helpus.volunteer.service.Impl;

import com.ssafy.helpus.volunteer.dto.*;
import com.ssafy.helpus.volunteer.entity.Member;
import com.ssafy.helpus.volunteer.entity.Volunteer;
import com.ssafy.helpus.volunteer.enumClass.VolunteerOrder;
import com.ssafy.helpus.volunteer.repository.MemberRepository;
import com.ssafy.helpus.volunteer.repository.VolunteerRepository;
import com.ssafy.helpus.volunteer.service.FileService;
import com.ssafy.helpus.volunteer.service.MemberService;
import com.ssafy.helpus.volunteer.service.TalentDonationService;
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
public class TalentDonationServiceImpl implements TalentDonationService {

    private final VolunteerRepository volunteerRepository;
    private final FileService fileService;
    private final MemberService memberService;
    private final MemberRepository memberRepository;

    @Override
    public Map<String, Object> registerTalentDonation(TalentDonationReqDto talentDonationReqDto, Long memberId, MultipartFile[] files, String role) throws Exception {
        log.info("TalentDonationService registerTalentDonation call");

        Map<String, Object> resultMap = new HashMap<>();

        if(files != null && !fileService.fileExtensionCheck(files)) {
            resultMap.put("message", "파일확장자 불량");
            return resultMap;
        }

        Volunteer volunteer = Volunteer.builder()
                .memberId(memberId)
                .title(talentDonationReqDto.getTitle())
                .content(talentDonationReqDto.getContent())
                .category(role)
                .build();
        volunteerRepository.save(volunteer);

        if(files != null){
            fileService.volunteerFileSave(volunteer, files);
        }

        resultMap.put("message", "성공");
        resultMap.put("volunteerId", volunteer.getVolunteerId());

        return resultMap;
    }

    @Override
    @Transactional
    public Map<String, Object> updateTalentDonation(TalentDonationUpdateReqDto talentDonationUpdateReqDto, Long memberId, MultipartFile[] files, String role) throws Exception {
        log.info("TalentDonationService updateTalentDonation call");

        Map<String, Object> resultMap = new HashMap<>();

        if(files != null && !fileService.fileExtensionCheck(files)) {
            resultMap.put("message", "파일확장자 불량");
            return resultMap;
        }

        Optional<Volunteer> volunteer = volunteerRepository.findById(talentDonationUpdateReqDto.getVolunteerId());

        volunteer.get().setTitle(talentDonationUpdateReqDto.getTitle());
        volunteer.get().setContent(talentDonationUpdateReqDto.getContent());
        volunteer.get().setUpdateDate(LocalDateTime.now());

        if(files == null){
            fileService.volunteerFileDelete(volunteer.get().getImages());
        }
        else{
            fileService.volunteerFileDelete(volunteer.get().getImages());
            fileService.volunteerFileSave(volunteer.get(), files);
        }

        resultMap.put("message", "게시물 수정 성공");
        return resultMap;
    }

    @Override
    @Transactional
    public Map<String, Object> getTalentDonation(Long volunteerId) throws Exception {
        log.info("TalentDonationService getTalentDonation call");

        Map<String, Object> resultMap = new HashMap<>();

        Optional<Volunteer> volunteer = volunteerRepository.findById(volunteerId);

        if(!volunteer.isPresent()){
            resultMap.put("message", "게시물 없음");
            return resultMap;
        }

        Optional<Member> member = memberRepository.findById(volunteer.get().getMemberId());


        TalentDonationResDto talentDonationResDto = TalentDonationResDto.builder()
                .memberId(volunteer.get().getMemberId())
                .title(volunteer.get().getTitle())
                .content(volunteer.get().getContent())
                .createDate(volunteer.get().getCreateDate())
                .updateDate(volunteer.get().getUpdateDate())
                .name(member.get().getName())
                .profile(member.get().getProfile())
                .userEmail(member.get().getEmail())
                .images(fileService.getVolunteerFileList(volunteer.get().getImages())).build();

        resultMap.put("message", "조회 성공");
        resultMap.put("volunteer", talentDonationResDto);
        return resultMap;
    }

    @Override
    @Transactional
    public Map<String, Object> deleteTalentDonation(Long volunteerId) throws Exception {
        log.info("TalentDonationService deleteTalentDonation call");

        Map<String, Object> resultMap = new HashMap<>();

        Optional<Volunteer> volunteer = volunteerRepository.findById(volunteerId);
        if(!volunteer.isPresent()){
            resultMap.put("message", "해당게시물은 없습니다");
            return resultMap;
        }
        volunteerRepository.deleteById(volunteerId);

        resultMap.put("message", "삭제성공");
        return resultMap;
    }

    @Override
    public Map<String, Object> listTalenDonation(String category, int page) throws Exception {
        log.info("TalentDonationService listTalentDonation call");

        Page<Volunteer> volunteers;
        volunteers = volunteerRepository.findByCategory(category, PageRequest.of(page,10, Sort.by(Sort.Direction.DESC, "volunteerId")));

        return makeListTalentDonation(volunteers, page);
    }

    @Override
    public Map<String, Object> makeListTalentDonation(Page<Volunteer> volunteers, int page) throws Exception {
        log.info("TalentDonationService makeListTalentDonation call");

        Map<String, Object> resultMap = new HashMap<>();

        if(volunteers.isEmpty()){
            resultMap.put("message", "게시물없음");
            return resultMap;
        }
        List<ListTalentDonationResDto> list = new ArrayList<>();

        int idx = volunteerRepository.countAllByCategory("USER");
        idx -= page*10;

        for(Volunteer volunteer : volunteers){
            Map<String, String> member = memberService.getMember(volunteer.getMemberId());

            ListTalentDonationResDto listTalentDonationResDto = ListTalentDonationResDto.builder()
                    .volunteerId(volunteer.getVolunteerId())
                    .title(volunteer.getTitle())
                    .content(volunteer.getContent())
                    .memberId(Long.parseLong(member.get("memberId")))
                    .name(member.get("name"))
                    .profile(member.get("profile"))
                    .no(idx)
                    .createDate(volunteer.getCreateDate()).build();
            list.add(listTalentDonationResDto);

            idx--;
        }
        resultMap.put("listTalentDonation", list);
        resultMap.put("totalPage", volunteers.getTotalPages());
        resultMap.put("message", "성공");
        return resultMap;
    }

    @Override
    public Map<String, Object> mainListTalentDonation(String order, int page) throws Exception {
        log.info("VolunteerService mainListVolunteer call");

        Sort sort = gerOrder(order);
        Page<Volunteer> volunteers = volunteerRepository.findByCategoryAndStatus("USER", 0, PageRequest.of(page,10,sort));
        return makeListTalentDonation(volunteers, page);
    }

    @Override
    public Map<String, Object> myTalentDonationList(Long memberId, int page) throws Exception {

        Map<String, Object> resultMap = new HashMap<>();

        Page<Volunteer> volunteers = volunteerRepository.findByMemberId(memberId, PageRequest.of(page, 10, Sort.by("volunteerId").descending()));

        if(volunteers.isEmpty()){
            resultMap.put("message", "게시물 없음");
            return resultMap;
        }

        int idx = volunteerRepository.countAllByMemberId(memberId);
        idx -= page*10;

        List<ListTalentDonationResDto> list = new ArrayList<>();

        for(Volunteer volunteer : volunteers){
            Map<String, String> member = memberService.getMember(volunteer.getMemberId());

            ListTalentDonationResDto listTalentDonationResDto = ListTalentDonationResDto.builder()
                    .volunteerId(volunteer.getVolunteerId())
                    .title(volunteer.getTitle())
                    .content(volunteer.getContent())
                    .memberId(Long.parseLong(member.get("memberId")))
                    .name(member.get("name"))
                    .profile(member.get("profile"))
                    .no(idx)
                    .createDate(volunteer.getCreateDate()).build();
            list.add(listTalentDonationResDto);

            idx--;
        }
        resultMap.put("listTalentDonation", list);
        resultMap.put("totalPage", volunteers.getTotalPages());
        resultMap.put("message", "성공");
        return resultMap;

    }

    @Override
    public Map<String, Object> searchTalentDonationList(String keyword, int page) throws Exception {
        Map<String, Object> resultMap = new HashMap<>();

        Page<Volunteer> volunteers = volunteerRepository.findByTitleContainingAndCategory(keyword, "USER", PageRequest.of(page, 10, Sort.by("volunteerId").descending()));
        return  makeListTalentDonation(volunteers, page);
    }


    public Sort gerOrder(String order) {
        //정렬(최신, 달성률 높은, 달성률 낮은, 오래된)
        if(order.equals(VolunteerOrder.최신순.toString())) { return Sort.by("volunteerId").descending(); }
        else
            //if(order.equals(VolunteerOrder.오래된순.toString()))
        { return Sort.by("volunteerId").ascending(); }
        //else if(order.equals(VolunteerOrder.높은순.toString())) { return Sort.by("percent").descending(); }
        //else { return Sort.by("percent").ascending();}
    }

}
