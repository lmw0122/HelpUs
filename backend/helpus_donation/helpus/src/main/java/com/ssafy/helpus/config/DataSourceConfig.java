package com.ssafy.helpus.config;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;

@Configuration
@EnableConfigurationProperties
public class DataSourceConfig {

    @Primary
    @Bean
    @Qualifier
    @ConfigurationProperties(prefix = "spring.datasource.donation")
    public DataSource donationDataSource() {
        return DataSourceBuilder.create().type(HikariDataSource.class).build();
    }

    @Bean
    @Qualifier
    @ConfigurationProperties(prefix = "spring.datasource.member")
    public DataSource memberDataSource() {
        return DataSourceBuilder.create().type(HikariDataSource.class).build();
    }
}
