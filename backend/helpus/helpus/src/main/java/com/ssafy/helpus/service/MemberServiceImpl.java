package com.ssafy.helpus.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.ssafy.helpus.model.Member;
import com.ssafy.helpus.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class MemberServiceImpl implements MemberService{
    @Autowired
    private MemberRepository memberRepository;
    @Override
    public boolean join(Member member) {
        try {
            memberRepository.save(member);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public String login(Member member) {
        Member m = memberRepository.findByEmailAndPassword(member.getEmail(),member.getPassword());
        if(m != null){
            //톸큰 생성
            String jwt = JWT.create()
                    .withSubject("loginToken")
                    .withIssuer("auth")
                    .withExpiresAt(new Date(System.currentTimeMillis()+(60*1000*30)))
                    .withClaim("memberId",m.getMemberId())
                    .withClaim("role",m.getRole())
                    .sign(Algorithm.HMAC256("helpus"));

            return jwt;
        }
        else
            return "error";
    }
}
