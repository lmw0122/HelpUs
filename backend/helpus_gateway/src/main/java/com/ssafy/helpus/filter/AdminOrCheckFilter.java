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
public class AdminOrCheckFilter extends AbstractGatewayFilterFactory<AdminOrCheckFilter.Config> {
    public static class Config{

    }
    public AdminOrCheckFilter(){
        super(Config.class);
    }
    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            System.out.println("admin or check filter act");
            ServerHttpRequest req = exchange.getRequest();
            if(!req.getHeaders().containsKey("role")){
                return onError(exchange, "키가 없음", HttpStatus.UNAUTHORIZED);
            }
            String role = Objects.requireNonNull(req.getHeaders().get("role").get(0));

            if(role.equals("ADMIN")){
                return chain.filter(exchange);
            }
            else {
                int memberId = Integer.parseInt(Objects.requireNonNull(req.getHeaders().get("memberId").get(0)));
                int memberIdByToken = Integer.parseInt(Objects.requireNonNull(req.getHeaders().get("memberIdByToken").get(0)));
                if(memberId != memberIdByToken)
                    return onError(exchange,"본인이 아님", HttpStatus.UNAUTHORIZED);
                return chain.filter(exchange);
            }
        });
    }
    private Mono<Void> onError(ServerWebExchange exchange, String e, HttpStatus status){
        ServerHttpResponse res = exchange.getResponse();
        res.setStatusCode(status);

        System.out.println(e);
        return res.setComplete();
    }
}
