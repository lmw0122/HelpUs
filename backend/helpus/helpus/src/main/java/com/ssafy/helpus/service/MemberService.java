package com.ssafy.helpus.service;

import com.ssafy.helpus.dto.Member.MemberDto;
import com.ssafy.helpus.model.Member;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface MemberService {
    boolean joinUser(MemberDto member);
    boolean joinOrg(MemberDto member,MultipartFile registration);
    MemberDto checkMember(MemberDto member);
    String login(MemberDto member);
    String getEmailCode(String email);
    String getPhoneCode(String phoneNumber);
    boolean checkEmail(String email);
    boolean checkTel(String phoneNumber);
    MemberDto getMemberById(int id);
    boolean updateMember(int id,MultipartFile newProfile,String newInfo,String isDefault) throws IOException;
    boolean updateMemberByAdmin(int id,MultipartFile newProfile,Member member) throws IOException;
    boolean deleteMember(int id);
    int getCount();
    List<MemberDto> getAllMembers();
    int getWaitCount();
    List<MemberDto> getWaitMembers();

    boolean updateMemberPermission(int memberId);

    boolean updateMemberWarning(int memberId);

    List<MemberDto> getMembersByEmail(String content);

    List<MemberDto> getMembersByName(String content);
}
