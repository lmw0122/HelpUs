package com.ssafy.helpus.volunteer.service;

import java.util.Map;

public interface MemberService {

    Map<String, String> getMember(Long memberId);

    String getMemberName(Long memberId);

}
