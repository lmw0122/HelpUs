package com.ssafy.helpus.filter;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.Objects;
import java.util.StringTokenizer;

@Component
public class CheckInPathFilter extends AbstractGatewayFilterFactory<CheckInPathFilter.Config> {
    public static class Config{

    }
    public CheckInPathFilter(){
        super(Config.class);
    }
    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            System.out.println("check in path filter act");
            ServerHttpRequest req = exchange.getRequest();
            if(!req.getHeaders().containsKey("memberIdByToken")){
                return onError(exchange, "키가 없음", HttpStatus.UNAUTHORIZED);
            }
            int memberId = 0;
            String path = req.getPath().toString();
            if(path.contains("?")){
                int idx = path.indexOf("?");
                path = path.substring(0,idx);
            }
            MultiValueMap<String,String> map = req.getQueryParams();
            StringTokenizer st = new StringTokenizer(path,"/");
            while(true){
                if(!st.hasMoreTokens()){
                    break;
                }
                else if(st.countTokens() == 1)
                    memberId = Integer.parseInt(st.nextToken());
                else
                    System.out.println("token : "+st.nextToken());
            }
            System.out.println(map);
            System.out.println("path : "+path);
            int memberIdByToken = Integer.parseInt(Objects.requireNonNull(req.getHeaders().get("memberIdByToken").get(0)));
            if(memberId != memberIdByToken)
                return onError(exchange,"본인이 아님", HttpStatus.UNAUTHORIZED);
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
