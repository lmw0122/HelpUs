package com.ssafy.helpus.service.Impl;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.netflix.discovery.converters.Auto;
import com.ssafy.helpus.config.jwt.JwtProperties;
import com.ssafy.helpus.dto.Member.MemberDto;
import com.ssafy.helpus.model.Member;
import com.ssafy.helpus.repository.MemberRepository;
import com.ssafy.helpus.service.EmailService;
import com.ssafy.helpus.service.MemberService;
import com.ssafy.helpus.service.PhoneService;
import com.ssafy.helpus.service.S3Service;
import javassist.Loader;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private final S3Service s3Service;

    @Autowired
    private final EmailService emailService;

    @Autowired
    private final PhoneService phoneService;

    @Override
    public boolean joinUser(MemberDto member) {
        try {
            member.setRole("USER");
            Member m = Member.builder()
                    .memberId(member.getMemberId())
                    .address(member.getAddress())
                    .createDate(member.getCreateDate())
                    .email(member.getEmail())
                    .info(member.getInfo())
                    .name(member.getName())
                    .orgZipcode(member.getOrgZipcode())
                    .password(member.getPassword())
                    .profile(member.getProfile())
                    .registration(member.getRegistration())
                    .tel(member.getTel())
                    .warnCount(0)
                    .role("USER").build();
            memberRepository.save(m);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean joinOrg(MemberDto member, MultipartFile registration) {
        try {
            String registUrl = s3Service.upload(registration);
            Member m = Member.builder()
                    .memberId(member.getMemberId())
                    .address(member.getAddress())
                    .createDate(member.getCreateDate())
                    .email(member.getEmail())
                    .info(member.getInfo())
                    .name(member.getName())
                    .orgZipcode(member.getOrgZipcode())
                    .password(member.getPassword())
                    .profile(member.getProfile())
                    .registration(registUrl)
                    .tel(member.getTel())
                    .warnCount(0)
                    .role("ORG_WAIT").build();
            memberRepository.save(m);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public MemberDto checkMember(MemberDto member) {
        Member result = memberRepository.findByEmail(member.getEmail());
        MemberDto r = converter(result);
        return r;
    }

    @Override
    public String login(MemberDto member) {

        String jwtToken = JWT.create()
                .withIssuer("auth")
                //토큰의 만료 시간 설정
                .withExpiresAt(new Date(System.currentTimeMillis()+ JwtProperties.EXPIRATION_TIME))
                .withClaim("memberId",member.getMemberId())
                .withClaim("role",member.getRole())
                .sign(Algorithm.HMAC256(JwtProperties.SECRET));
        return jwtToken;
    }

    @Override
    public String getEmailCode(String email) {
        Random rand = new Random();
        rand.setSeed(System.currentTimeMillis());
        int codeInt = rand.nextInt(99999);
        String code = String.format("%05d",codeInt);
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(email);
            mailMessage.setSubject("Helpus 이메일 인증 코드");
            mailMessage.setText("인증 번호는 "+code+"입니다.\n페이지로 돌아가 입력해주세요.");
            System.out.println("code : "+code);
            emailService.sendEmail(mailMessage);
        }catch (Exception e){
            e.printStackTrace();
            code = "error";
        }
        return code;
    }

    @Override
    public String getPhoneCode(String phoneNumber) {
        Random rand = new Random();
        rand.setSeed(System.currentTimeMillis());
        int codeInt = rand.nextInt(99999);
        String code = String.format("%05d",codeInt);
        try {
            phoneService.sendSms(phoneNumber,code);
            System.out.println("code : "+code);
        }catch (Exception e){
            e.printStackTrace();
            code = "error";
        }
        return code;
    }

    @Override
    public boolean checkTel(String phoneNumber) {
        Member check = memberRepository.findByTel(phoneNumber);
        if(check == null)
            return false;
        else
            return true;
    }

    @Override
    public MemberDto getMemberById(int id) {
        Member result = memberRepository.findByMemberId(id);
        MemberDto m = converter(result);
        return m;
    }

    @Override
    public boolean updateMember(int id, MultipartFile newProfile,String newInfo) throws IOException {
        System.out.println(newProfile);
        try {
            Member m = memberRepository.findByMemberId(id);
            String preUrl = m.getProfile();
            if(newProfile != null){
                if(preUrl != null){
                    s3Service.delete(preUrl);
                }
                String newUrl = s3Service.upload(newProfile);
                m.setProfile(newUrl);
            }
            if(newInfo != ""){
                m.setInfo(newInfo);
            }
            memberRepository.save(m);

            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }
    @Override
    public boolean updateMemberByAdmin(int id, MultipartFile newProfile,Member member) throws IOException {
        try {
            Member m = memberRepository.findByMemberId(id);
            String preUrl = m.getProfile();
            if(newProfile != null){
                if(preUrl != null){
                    s3Service.delete(preUrl);
                }
                String newUrl = s3Service.upload(newProfile);
                m.setProfile(newUrl);
            }
            if(member != null){
                m.setInfo(member.getInfo());
                m.setName(member.getName());
            }
            memberRepository.save(m);

            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean deleteMember(int id) {
        try {
            Member m = memberRepository.findByMemberId(id);
            m.setRole("DELETED");
            memberRepository.save(m);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public int getCount() {
        return memberRepository.getCount() ;
    }

    @Override
    public List<MemberDto> getAllMembers() {
        List<Member> resultsFrom = memberRepository.findAll();
        List<MemberDto> results = new ArrayList<>();
        for(Member result :resultsFrom){
            MemberDto m = converter(result);
            results.add(m);
        }
        return results;
    }

    @Override
    public int getWaitCount() {
        return memberRepository.getWaitCount();
    }

    @Override
    public List<MemberDto> getWaitMembers() {

        List<Member> resultsFrom =  memberRepository.getWaitMembers();
        List<MemberDto> results = new ArrayList<>();
        for(Member result :resultsFrom){
            MemberDto m = converter(result);
            results.add(m);
        }
        return results;
    }

    @Override
    public boolean updateMemberPermission(int memberId) {
        Member tmp = memberRepository.findByMemberId(memberId);
        if(tmp != null){
            tmp.setRole("ORG");
            memberRepository.save(tmp);
            return true;
        }
        else
            return false;
    }

    @Override
    public boolean updateMemberWarning(int memberId) {
        Member tmp = memberRepository.findByMemberId(memberId);
        if(tmp != null){
            int newCount = tmp.getWarnCount()+1;
            if(newCount >= 3)
                tmp.setRole("DELETED");
            tmp.setWarnCount(newCount);
            memberRepository.save(tmp);
            return true;
        }
        else
            return false;
    }

    @Override
    public List<MemberDto> getMembersByEmail(String content) {
        List<Member> resultsFrom = memberRepository.findByEmailContains(content);
        List<MemberDto> results = new ArrayList<>();
        for(Member result :resultsFrom){
            MemberDto m = converter(result);
            results.add(m);
        }
        return results;
    }

    @Override
    public List<MemberDto> getMembersByName(String content) {
        List<Member> resultsFrom = memberRepository.findByNameContains(content);
        List<MemberDto> results = new ArrayList<>();
        for(Member result :resultsFrom){
            MemberDto m = converter(result);
            results.add(m);
        }
        return results;
    }

    @Override
    public boolean checkEmail(String email) {
        Member check = memberRepository.findByEmail(email);
        if(check == null)
            return false;
        else
            return true;
    }
    public MemberDto converter(Member result){
        MemberDto m = MemberDto.builder()
                .memberId(result.getMemberId())
                .address(result.getAddress())
                .createDate(result.getCreateDate())
                .email(result.getEmail())
                .info(result.getInfo())
                .name(result.getName())
                .orgZipcode(result.getOrgZipcode())
                .password(result.getPassword())
                .profile(result.getProfile())
                .registration(result.getRegistration())
                .tel(result.getTel())
                .warnCount(result.getWarnCount())
                .role(result.getRole()).build();
        return m;
    }
}
