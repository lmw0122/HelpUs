package com.ssafy.helpus.filter;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.Objects;

@Component
public class AdminFilter extends AbstractGatewayFilterFactory<AdminFilter.Config> {
    public static class Config{

    }
    public AdminFilter(){
        super(Config.class);
    }
    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            System.out.println("admin filter act");
            ServerHttpRequest req = exchange.getRequest();
            if(!req.getHeaders().containsKey("role")){
                return onError(exchange, "role이 없음", HttpStatus.UNAUTHORIZED);
            }
            String role = Objects.requireNonNull(req.getHeaders().get("role").get(0));
            if(!role.equals("ADMIN"))
                return onError(exchange,"권한 없음", HttpStatus.UNAUTHORIZED);
            return chain.filter(exchange);

        });
    }
    private Mono<Void> onError(ServerWebExchange exchange, String e, HttpStatus status){
        ServerHttpResponse res = exchange.getResponse();
        res.setStatusCode(status);

        System.out.println(e);
        return res.setComplete();
    }
}