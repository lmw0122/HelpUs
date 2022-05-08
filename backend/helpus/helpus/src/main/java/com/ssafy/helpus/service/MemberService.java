package com.ssafy.helpus.service;

import com.ssafy.helpus.model.Member;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface MemberService {
    boolean joinUser(Member member, MultipartFile profile);
    boolean joinOrg(Member member,MultipartFile registration,MultipartFile profile);
    String login(Member member);
    String getEmailCode(String email);
    String getPhoneCode(String phoneNumber);
    boolean checkEmail(String email);
    boolean checkTel(String phoneNumber);
    Member getMemberById(int id);
    boolean updateMember(int id,MultipartFile newProfile,String newInfo) throws IOException;
    boolean updateMemberByAdmin(int id,MultipartFile newProfile,Member member) throws IOException;
    boolean deleteMember(int id);
    int getCount();
    List<Member> getAllMembers();
    int getWaitCount();
    List<Member> getWaitMembers();

    boolean updateMemberPermission(int memberId);

    boolean updateMemberWarning(int memberId);
}
