package com.ssafy.helpus.member.entity;

import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Table(schema = "member", name = "member")
public class Member {
    @Id @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false)
    private String name;

    private String profile;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String tel;

    @Column(nullable = false)
    private String role;

    private String address;

    private String registration;

    private String info;

    @Column(name = "org_zipcode")
    private Integer orgZipcode;

    @Column(name = "warn_count", nullable = false)
    private int warnCount;

    @Column(name = "create_date", nullable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm")
    private LocalDateTime createDate;
}
