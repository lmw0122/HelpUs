package com.ssafy.helpus.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;


import java.util.Objects;

@Component
public class JwtFilter extends AbstractGatewayFilterFactory<JwtFilter.Config> {


    public JwtFilter(){
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            ServerHttpRequest req = exchange.getRequest();
            if(!req.getHeaders().containsKey(HttpHeaders.AUTHORIZATION)){
                return onError(exchange, "키가 없음",HttpStatus.UNAUTHORIZED);
            }
            String auth = Objects.requireNonNull(req.getHeaders().get(HttpHeaders.AUTHORIZATION).get(0));
            String token = auth.replace("Bearer ","").trim();
            System.out.println(token);
            DecodedJWT jwt = getDecodedJWT(token);
            if(jwt == null){
                return onError(exchange,"키가 유효하지 않음", HttpStatus.UNAUTHORIZED);
            }
            else{
                int memberId = jwt.getClaim("memberId").asInt();
                String role = jwt.getClaim("role").asString();
                req.mutate().header("memberId", String.valueOf(memberId)).header("role",role).build();
                return chain.filter(exchange.mutate().request(req).build());
            }
        });
    }
    private Mono<Void> onError(ServerWebExchange exchange, String e, HttpStatus status){
        ServerHttpResponse res = exchange.getResponse();
        res.setStatusCode(status);

        System.out.println(e);
        return res.setComplete();
    }

    private DecodedJWT getDecodedJWT(String token){
        try {
            System.out.println("--------------------------------------------------------");
            Algorithm algo = Algorithm.HMAC256("helpus");
            System.out.println("++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
            JWTVerifier verifier = JWT.require(algo).withIssuer("auth").build();
            System.out.println("--------------------------------------------------------");
            DecodedJWT jwt = verifier.verify(token);
            System.out.println("++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
            System.out.println(jwt.getClaim("memberId"));
            return jwt;

        }catch (JWTVerificationException e){
            return null;
        }
    }

    public static class Config{

    }
}
