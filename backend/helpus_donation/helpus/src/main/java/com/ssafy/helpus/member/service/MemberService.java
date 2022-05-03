package com.ssafy.helpus.member.service;

import com.ssafy.helpus.member.entity.Member;
import com.ssafy.helpus.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public Map<String, String> getMember (Long memberId) {
        log.info("MemberService getMember call");

        Map<String, String> map = new HashMap<>();
        Member member = memberRepository.findById(memberId).get();
        map.put("name", member.getName());
        map.put("profile", member.getProfile());

        return map;
    }
}
