package com.ssafy.helpus.volunteer.service.Impl;

import com.ssafy.helpus.volunteer.dto.*;

import com.ssafy.helpus.volunteer.entity.Volunteer;
import com.ssafy.helpus.volunteer.entity.VolunteerApply;
import com.ssafy.helpus.volunteer.enumClass.VolunteerOrder;
import com.ssafy.helpus.volunteer.repository.VolunteerApplyRepository;
import com.ssafy.helpus.volunteer.repository.VolunteerRepository;
import com.ssafy.helpus.volunteer.service.FileService;
import com.ssafy.helpus.volunteer.service.MemberService;
import com.ssafy.helpus.volunteer.service.VolunteerService;
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
public class VolunteerServiceImpl implements VolunteerService{

    private final VolunteerRepository volunteerRepository;
    private final FileService fileService;
    private final VolunteerApplyRepository volunteerApplyRepository;
    private final MemberService memberService;

    @Override
    public Map<String, Object> registerVoluneer(VolunteerReqDto volunteerReqDto, Long memberId, MultipartFile[] files, String role) throws Exception {
        log.info("VolunteerService registerVolunteer call");

        Map<String, Object> resultMap = new HashMap<>();

        if(files != null && !fileService.fileExtensionCheck(files)) {
            resultMap.put("message", "파일확장자 불량");
            return resultMap;
        }
        Volunteer volunteer = Volunteer.builder()
                .memberId(memberId)
                .title(volunteerReqDto.getTitle())
                .content(volunteerReqDto.getContent())
                .volZipcode(volunteerReqDto.getVolZipcode())
                .volAddress(volunteerReqDto.getVolAddress())
                .people(volunteerReqDto.getPeople())
                .applicant(0)
                .time(volunteerReqDto.getTime())
                .volDate(volunteerReqDto.getVolDate())
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
    public Map<String, Object> updateVolunteer(VolunteerUpdateReqDto volunteerUpdateReqDto, Long memberId, MultipartFile[] files, String role) throws Exception {
        log.info("VolunteerService updateVolunteer call");

        Map<String, Object> resultMap = new HashMap<>();

        if(files != null && !fileService.fileExtensionCheck(files)) {
            resultMap.put("message", "파일확장자 불량");
            return resultMap;
        }

        Optional<Volunteer> volunteer = volunteerRepository.findById(volunteerUpdateReqDto.getVolunteerId());

        volunteer.get().setTitle(volunteerUpdateReqDto.getTitle());
        volunteer.get().setContent(volunteerUpdateReqDto.getContent());
        volunteer.get().setVolZipcode(volunteerUpdateReqDto.getVolZipcode());
        volunteer.get().setVolAddress(volunteerUpdateReqDto.getVolAddress());
        volunteer.get().setPeople(volunteerUpdateReqDto.getPeople());
        volunteer.get().setTime(volunteerUpdateReqDto.getTime());
        volunteer.get().setVolDate(volunteerUpdateReqDto.getVolDate());
        volunteer.get().setUpdateDate(LocalDateTime.now());
        double now_people = volunteerUpdateReqDto.getPeople();
        double now_applicant = volunteer.get().getApplicant();
        double now_percent = now_applicant/now_people*100.0;
        volunteer.get().setPercent(now_percent);

        if(files == null){
            fileService.volunteerFileDelete(volunteer.get().getImages());
        }
        else{
            fileService.volunteerFileDelete(volunteer.get().getImages());
            fileService.volunteerFileSave(volunteer.get(), files);
        }

//        if(files != null){
//            fileService.volunteerFileDelete(volunteer.get().getImages());
//            fileService.volunteerFileSave(volunteer.get(), files);
//        }

        resultMap.put("message", "성공");
        return resultMap;

    }

    @Override
    @Transactional
    public Map<String, Object> getVoluneer(Long volunteerId) throws Exception {
        log.info("VolunteerService getVolunteer call");

        Map<String, Object> resultMap = new HashMap<>();

        Optional<Volunteer> volunteer = volunteerRepository.findById(volunteerId);
        if(!volunteer.isPresent()){
            resultMap.put("message", "게시물 없음");
            return resultMap;
        }

        VolunteerResDto volunteerResDto = VolunteerResDto.builder()
                .memberId(volunteer.get().getMemberId())
                .title(volunteer.get().getTitle())
                .content(volunteer.get().getContent())
                .createDate(volunteer.get().getCreateDate())
                .updateDate(volunteer.get().getUpdateDate())
                .volDate(volunteer.get().getVolDate())
                .volAddress(volunteer.get().getVolAddress())
                .volZipcode(volunteer.get().getVolZipcode())
                .applicant(volunteer.get().getApplicant())
                .people(volunteer.get().getPeople())
                .time(volunteer.get().getTime())
                .percent(volunteer.get().getPercent())
                .images(fileService.getVolunteerFileList(volunteer.get().getImages())).build();

        resultMap.put("message", "조회 성공");
        resultMap.put("volunteer", volunteerResDto);
        return resultMap;
    }

    @Override
    public Map<String, Object> getApplyStatus(Long volunteerId, Long memberId) throws Exception {
        log.info("VolunteerService getApplyStatus call");

        Map<String, Object> resultMap = new HashMap<>();

        Optional<Volunteer> volunteer = volunteerRepository.findById(volunteerId);
        if(!volunteer.isPresent()){
            resultMap.put("message", "게시물 없음");
            return resultMap;
        }

        Optional<VolunteerApply> volunteerApply = volunteerApplyRepository.findByVolunteerAndMemberId(volunteer.get(), memberId);

        int status = -1;
        if(volunteerApply.isPresent()){
            status = volunteerApply.get().getStatus();
        }

       ApplyStatusRes applyStatusRes = ApplyStatusRes.builder()
                        .status(status).build();

        resultMap.put("message", "조회 성공");
        resultMap.put("applyStatus", applyStatusRes);
        return resultMap;
    }

    @Override
    @Transactional
    public Map<String, Object> deleteVolunteer(Long volunteerId) throws Exception {
        log.info("VolunteerService deleteVolunteer call");

        Map<String, Object> resultMap = new HashMap<>();

        Optional<Volunteer> volunteer = volunteerRepository.findById(volunteerId);
        if(!volunteer.isPresent()){
            resultMap.put("message", "해당게시물은 없습니다");
            return resultMap;
        }
        volunteerRepository.deleteById(volunteerId);

        resultMap.put("message", "삭제 성공");
        return resultMap;
    }

    @Override
    @Transactional
    public Map<String, Object> endVolunteer(Long volunteerId) throws Exception {
        log.info("VolunteerService endVolunteer call");
        Map<String, Object> resultMap = new HashMap<>();

        Optional<Volunteer> volunteer = volunteerRepository.findById(volunteerId);

        if(!volunteer.isPresent() || volunteer.get().getStatus()==1){
            resultMap.put("message", "마감처리 불가");
            return resultMap;
        }

        volunteer.get().setStatus(1);

        resultMap.put("message", "마감처리 성공");
        return  resultMap;
    }

    @Override
    @Transactional
    public Map<String, Object> applyVolunteer(Long volunteerId, Long memberId, String role) throws Exception {
        log.info("VolunteerService applyVolunteer call");
        Map<String, Object> resultMap = new HashMap<>();

        if(!role.equals("USER")){
            resultMap.put("message", "개인회원이 아닙니다");
            return resultMap;
        }

        Optional<Volunteer> volunteer = volunteerRepository.findById(volunteerId);

        if(volunteer.get().getPeople()<=volunteer.get().getApplicant()){
            resultMap.put("message", "가득차서 지원불가");
            return resultMap;
        }

        List<VolunteerApply> list = volunteerApplyRepository.findByVolunteer(volunteer.get());
        if(list!=null){
            for(int i=0; i<list.size(); i++){
                if(list.get(i).getMemberId()==memberId){
                    resultMap.put("message", "이미 지원했습니다");
                    return resultMap;
                }
            }
        }

        int now = volunteer.get().getApplicant()+1;
        volunteer.get().setApplicant(now);
        int now_people = volunteer.get().getPeople();
        double now_percent = (double)now/(double)now_people * 100.0;
        volunteer.get().setPercent(now_percent);
        if (now==now_people){
            volunteer.get().setStatus(1);
        }

        VolunteerApply volunteerApply = VolunteerApply.builder()
               .status(0)
               .volunteer(volunteer.get())
                .writeId(volunteer.get().getMemberId())
               .memberId(memberId).build();

        volunteerApplyRepository.save(volunteerApply);

        resultMap.put("message", "지원성공");
        return resultMap;
    }

    @Override
    public Map<String, Object> listVolunteer(String category, String order, int page) throws Exception {
        log.info("VolunteerService listVolunteer call");

        Sort sort = gerOrder(order);
        Page<Volunteer> volunteers;
        volunteers = volunteerRepository.findByCategory(category, PageRequest.of(page,10, sort));

        return makeListVolunteer(volunteers);
    }

    @Override
    public Map<String, Object> makeListVolunteer(Page<Volunteer> volunteers) throws Exception {
        log.info("VolunteerService makerVolunteerList call");

        Map<String, Object> resultMap = new HashMap<>();

        if(volunteers.isEmpty()){
            resultMap.put("message", "게시글 없음");
            return resultMap;
        }
        List<ListVolunteerResDto> list = new ArrayList<>();

        for(Volunteer volunteer : volunteers){

            Map<String, String> member = memberService.getMember(volunteer.getMemberId());

            ListVolunteerResDto listVolunteerResDto = ListVolunteerResDto.builder()
                    .volunteerId(volunteer.getVolunteerId())
                    .title(volunteer.getTitle())
                    .content(volunteer.getContent())
                    .applicant(volunteer.getApplicant())
                    .people(volunteer.getPeople())
                    .percent(volunteer.getPercent())
                    .volDate(volunteer.getVolDate())
                    .volAddress(volunteer.getVolAddress())
                    .volZipcode(volunteer.getVolZipcode())
                    .time(volunteer.getTime())
                    .status(volunteer.getStatus())
                    .memberId(Long.parseLong(member.get("memberId")))
                    .name(member.get("name"))
                    .profile(member.get("profile"))
                    .createDate(volunteer.getCreateDate()).build();
            list.add(listVolunteerResDto);
        }
        resultMap.put("listVolunteer", list);
        resultMap.put("totalPage", volunteers.getTotalPages());
        resultMap.put("message", "성공");
        return resultMap;
    }


    @Override
    public Map<String, Object> mainListVolunteer(String order, int page) throws Exception{
        log.info("VolunteerService mainListVolunteer call");

        Sort sort = gerOrder(order);
        Page<Volunteer> volunteers = volunteerRepository.findByCategoryAndStatus("ORG", 0, PageRequest.of(page,6,sort));
        return makeListVolunteer(volunteers);
    }

    @Override
    public Map<String, Object> myVolunteerList(Long memberId, int page, int status) throws Exception {
        log.info("VolunteerService myVolunteerList call");

        Page<Volunteer> end = volunteerRepository.findByMemberIdAndStatus(memberId,status, PageRequest.of(page, 6, Sort.by("volunteerId").descending()));
        return makeListVolunteer(end);
    }

    @Override
    public Map<String, Object> doVolunteerList(Long memberId, int page) throws Exception {
        log.info("VolunteerService doVolunteerList call");

        Map<String, Object> resultMap = new HashMap<>();
        Page<VolunteerApply> volunteerApplies = volunteerApplyRepository.findByMemberId(memberId, PageRequest.of(page, 10, Sort.by("status").ascending()));

        if(volunteerApplies.isEmpty()){
            resultMap.put("message", "봉사한 항목 없음");
            return resultMap;
        }
        List<ListVolunteerResDto> list = new ArrayList<>();

        for(VolunteerApply volunteerApply : volunteerApplies){
            Map<String, String> member = memberService.getMember(volunteerApply.getVolunteer().getMemberId());

            ListVolunteerResDto listVolunteerResDto = ListVolunteerResDto.builder()
                    .volunteerId(volunteerApply.getVolunteer().getVolunteerId())
                    .title(volunteerApply.getVolunteer().getTitle())
                    .content(volunteerApply.getVolunteer().getContent())
                    .applicant(volunteerApply.getVolunteer().getApplicant())
                    .people(volunteerApply.getVolunteer().getPeople())
                    .percent(volunteerApply.getVolunteer().getPercent())
                    .volDate(volunteerApply.getVolunteer().getVolDate())
                    .volAddress(volunteerApply.getVolunteer().getVolAddress())
                    .volZipcode(volunteerApply.getVolunteer().getVolZipcode())
                    .time(volunteerApply.getVolunteer().getTime())
                    .memberId(Long.parseLong(member.get("memberId")))
                    .name(member.get("name"))
                    .profile(member.get("profile"))
                    .status(volunteerApply.getStatus())
                    .createDate(volunteerApply.getVolunteer().getCreateDate()).build();
            list.add(listVolunteerResDto);
        }

        resultMap.put("listVolunteer", list);
        resultMap.put("totalPage", volunteerApplies.getTotalPages());
        resultMap.put("message", "성공");
        return resultMap;

    }

    @Override
    public Map<String, Object> myVolList(Long memberId) throws Exception {
        log.info("VolunteeerSevice myVolList call");

        Map<String, Object> resultMap = new HashMap<>();
        List<VolunteerApply> volunteerApplies = volunteerApplyRepository.findByMemberIdAndStatus(memberId, 1);

        if(volunteerApplies.isEmpty()){
            resultMap.put("message", "봉사한 항목 없음");
            return resultMap;
        }
        List<ListVolunteerResDto> list = new ArrayList<>();

        for(VolunteerApply volunteerApply : volunteerApplies){
            Map<String, String> member = memberService.getMember(volunteerApply.getVolunteer().getMemberId());

            ListVolunteerResDto listVolunteerResDto = ListVolunteerResDto.builder()
                    .volunteerId(volunteerApply.getVolunteer().getVolunteerId())
                    .title(volunteerApply.getVolunteer().getTitle())
                    .content(volunteerApply.getVolunteer().getContent())
                    .applicant(volunteerApply.getVolunteer().getApplicant())
                    .people(volunteerApply.getVolunteer().getPeople())
                    .percent(volunteerApply.getVolunteer().getPercent())
                    .volDate(volunteerApply.getVolunteer().getVolDate())
                    .volAddress(volunteerApply.getVolunteer().getVolAddress())
                    .volZipcode(volunteerApply.getVolunteer().getVolZipcode())
                    .time(volunteerApply.getVolunteer().getTime())
                    .memberId(Long.parseLong(member.get("memberId")))
                    .name(member.get("name"))
                    .profile(member.get("profile"))
                    .status(volunteerApply.getStatus())
                    .createDate(volunteerApply.getVolunteer().getCreateDate()).build();
            list.add(listVolunteerResDto);
        }

        resultMap.put("listVolunteer", list);
        resultMap.put("message", "성공");
        return resultMap;
    }


    public Sort gerOrder(String order) {
        //정렬(최신, 달성률 높은, 달성률 낮은, 오래된)
        if(order.equals(VolunteerOrder.최신순.toString())) { return Sort.by("volunteerId").descending(); }
        else if(order.equals(VolunteerOrder.오래된순.toString())) { return Sort.by("volunteerId").ascending(); }
        else if(order.equals(VolunteerOrder.높은순.toString())) { return Sort.by("percent").descending(); }
        else { return Sort.by("percent").ascending(); }
    }

}
