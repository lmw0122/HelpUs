package com.ssafy.helpus.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        entityManagerFactoryRef = "donationEntityManagerFactory",
        transactionManagerRef = "donationTransactionManager",
        basePackages = {"com.ssafy.helpus.volunteer.repository"}
)
public class VolunteerDataSourceConfig {

    @Autowired
    @Qualifier
    private DataSource volunteerDataSource;

    @Primary
    @Bean
    public LocalContainerEntityManagerFactoryBean donationEntityManagerFactory(EntityManagerFactoryBuilder builder) {
        return builder.dataSource(volunteerDataSource)
                .packages("com.ssafy.helpus.volunteer.entity")
                .persistenceUnit("volunteer").build();
    }

    @Primary
    @Bean
    public PlatformTransactionManager donationTransactionManager(EntityManagerFactoryBuilder builder) {
        return new JpaTransactionManager(donationEntityManagerFactory(builder).getObject());
    }
}
