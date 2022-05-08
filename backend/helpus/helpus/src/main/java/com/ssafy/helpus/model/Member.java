package com.ssafy.helpus.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Transactional
@Table(name = "member")
public class Member {

    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int memberId;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "name")
    private String name;

    @Column(name = "tel")
    private String tel;

    @Column(name = "role")
    private String role;

    @Column(name = "address")
    private String address;

    @Column(name = "profile")
    private String profile;

    @Column(name = "registration")
    private String registration;

    @Column(name = "info")
    private String info;

    @Column(name = "org_zipcode")
    private String orgZipcode;

    @Column(name = "warn_count")
    private int warnCount;

    @Column(name = "create_date")
    private LocalDateTime createDate;

    @OneToMany(mappedBy = "member",cascade = CascadeType.ALL)
    private List<Certification> certifications = new ArrayList<>();

    @OneToMany(mappedBy = "member",cascade = CascadeType.ALL)
    private List<HelpDesk> helpDesks = new ArrayList<>();

    @OneToMany(mappedBy = "member",cascade = CascadeType.ALL)
    private List<HelpDeskComment> helpDeskComments = new ArrayList<>();
}
