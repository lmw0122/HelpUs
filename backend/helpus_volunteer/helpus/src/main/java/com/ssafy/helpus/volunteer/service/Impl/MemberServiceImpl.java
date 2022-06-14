package com.ssafy.helpus.volunteer.service.Impl;

import com.ssafy.helpus.volunteer.entity.Member;
import com.ssafy.helpus.volunteer.repository.MemberRepository;
import com.ssafy.helpus.volunteer.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    public Map<String, String> getMember(Long memberId) {
        log.info("MemberService getMember call");

        Map<String, String> map = new HashMap<>();
        Member member = memberRepository.findById(memberId).get();
        map.put("memberId", Long.toString(member.getMemberId()));
        map.put("name", member.getName());
        map.put("profile", member.getProfile());

        return map;

    }

    @Override
    public String getMemberName(Long memberId) {
       log.info("MemberService getMemberName");

       return memberRepository.findById(memberId).get().getName();
    }

}
