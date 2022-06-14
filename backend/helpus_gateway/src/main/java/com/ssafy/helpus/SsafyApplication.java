package com.ssafy.helpus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class SsafyApplication {

	public static void main(String[] args) {
		SpringApplication.run(SsafyApplication.class, args);
	}

}
