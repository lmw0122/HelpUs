package com.ssafy.helpus.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.helpus.config.auth.PrincipalDetails;
import com.ssafy.helpus.model.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

// 스프링 시큐리티 필터 중에 UsernamePasswordAuthenticationFilter가 있음
// /login 주소로 id,pw 값을 넣어서 post로 요청하면
// UsernamePasswordAuthenticationFilter 이 필터가 작동함
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    
    // login 요청을 하면 로그인 시도를 위해서 실행되는 함수
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        System.out.println("로그인 시도");
        ObjectMapper om = new ObjectMapper();
        try {
            // id, pw 받아서
            Member member = om.readValue(request.getInputStream(),Member.class);
            System.out.println(member);
            // 정상인지 로그인 시도 authenticationManager를 이용 -> principalDetailsService가 호출 되서 loadUserByUsername() 함수가 실행됨
            UsernamePasswordAuthenticationToken aT = new UsernamePasswordAuthenticationToken(member.getEmail(),member.getPassword());
            // authenticate 함수를 통해 PrincipalDetailsService의 loadByUsername()함수가 실행되고
            // 정상이면 authentication이 리턴됨
            // => DB에 있는 username과 password가 일치한다.
            Authentication authentication = authenticationManager.authenticate(aT);
            // 저장이 잘 되었는지 꺼내서 프린트
            PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
            System.out.println("로그인 완료됨"+principalDetails.getMember().getMemberId());
            // principalDetails를 세션에 담음( 담지 않으면 권환 관리가 안되기 때문애ㅔ)
            // return 되면서 authentication이 session영역에 저장됨.
            // JWT를 쓰면 session을 쓸 필요가 없지만 security에서 권한 관리를 대신 해주기 때문에 편하려고 이용
            return authentication;
            // return 이후에 바로 실행되는 함수에서 JWT 토큰을 만들어서 반환
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    // attemptAuthentication 함수가 실행되고 인증이 정상적으로 되었으면 이 함수가 실행됨
    // 여기서 JWT 토큰을 만들어서 반환해주면 됨
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        System.out.println("successfulAuthentication 실행");
        // authResult를 이용해 JWT 토큰을 만듬
        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();
        String jwtToken = JWT.create()
                .withIssuer("auth")
                //토큰의 만료 시간 설정
                .withExpiresAt(new Date(System.currentTimeMillis()+JwtProperties.EXPIRATION_TIME))
                .withClaim("memberId",principalDetails.getMember().getMemberId())
                .withClaim("role",principalDetails.getMember().getRole())
                .sign(Algorithm.HMAC256(JwtProperties.SECRET));

        response.addHeader(JwtProperties.HEADER_STRING,JwtProperties.TOKEN_PREFIX+jwtToken);
    }
}
