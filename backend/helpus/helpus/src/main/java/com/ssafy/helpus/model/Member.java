package com.ssafy.helpus.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.helpus.config.enumClass.DeskCategory;
import lombok.Builder;
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

//    @OneToMany(mappedBy = "member",cascade = CascadeType.ALL)
//    @JsonBackReference(value = "1")
//    private List<Certification> certifications = new ArrayList<>();

    @OneToMany(mappedBy = "member",cascade = CascadeType.ALL)
    @JsonBackReference(value = "2")
    private List<HelpDesk> helpDesks = new ArrayList<>();

    @OneToMany(mappedBy = "member",cascade = CascadeType.ALL)
    @JsonBackReference(value = "3")
    private List<HelpDeskComment> helpDeskComments = new ArrayList<>();
    @Builder
    public Member(int memberId,String email,String password,String name,String tel,String role,String address,String profile,String registration,String info,String orgZipcode,int warnCount,LocalDateTime createDate) {
        this.memberId = memberId;
        this.email = email;
        this.password = password;
        this.name = name;
        this.tel = tel;
        this.role = role;
        this.address = address;
        this.profile = profile;
        this.registration = registration;
        this.info = info;
        this.orgZipcode = orgZipcode;
        this.warnCount = warnCount;
        this.createDate = createDate;
    }
}
