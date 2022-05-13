package com.ssafy.helpus.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.transaction.Transactional;

@Entity
@Data
@NoArgsConstructor
@Transactional
@Table(name = "certification")
public class Certification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "certification_id")
    private int certificationId;

    @Column(name = "url")
    private String url;

    @Column(name = "cerification_num")
    private String certificationNum;

//    @ManyToOne
//    @JoinColumn(name = "member_id")
//    private Member member;

}
