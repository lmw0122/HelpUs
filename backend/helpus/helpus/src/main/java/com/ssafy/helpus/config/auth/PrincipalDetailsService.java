package com.ssafy.helpus.config.auth;

import com.ssafy.helpus.model.Member;
import com.ssafy.helpus.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

// http://localhost:8080/login => 여기서 동작을 안함 ( config에서 formLogin.disable 했기 때문
// 직접 필터에서 걸어줘야함
@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("loadUserByUsername 실행됨");
        Member memberEntity = memberRepository.findByEmail(email);

        return new PrincipalDetails(memberEntity);
    }
}
