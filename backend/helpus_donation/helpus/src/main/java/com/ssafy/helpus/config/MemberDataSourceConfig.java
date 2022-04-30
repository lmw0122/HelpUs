package com.ssafy.helpus.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        entityManagerFactoryRef = "memberEntityManagerFactory",
        transactionManagerRef = "memberTransactionManager",
        basePackages = {"com.ssafy.helpus.member.repository"}
)
public class MemberDataSourceConfig {

    @Autowired
    @Qualifier
    private DataSource memberDataSource;

    @Bean
    public LocalContainerEntityManagerFactoryBean memberEntityManagerFactory(EntityManagerFactoryBuilder builder) {
        return builder.dataSource(memberDataSource)
                .packages("com.ssafy.helpus.member.entity")
                .persistenceUnit("member").build();
    }

    @Bean
    public PlatformTransactionManager memberTransactionManager(EntityManagerFactoryBuilder builder) {
        return new JpaTransactionManager(memberEntityManagerFactory(builder).getObject());
    }
}
