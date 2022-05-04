package com.ssafy.helpus.service;

import com.ssafy.helpus.model.Member;

public interface MemberService {
    boolean join(Member member);
    String login(Member member);
}
