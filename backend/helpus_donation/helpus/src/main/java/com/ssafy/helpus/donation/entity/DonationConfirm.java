package com.ssafy.helpus.donation.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor
@Table(name = "donation_confirm")
public class DonationConfirm {
    @Id @Column(name = "donation_confirm_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer donationConfirmId;

    @Column(name = "donation_id", updatable = false)
    private Integer donationId;

    @Column(name = "member_id", nullable = false, updatable = false)
    private Integer memberId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(name = "create_date", insertable = false, updatable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm")
    private LocalDateTime createDate;

    @Column(name = "update_date", insertable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm")
    private LocalDateTime updateDate;

    @OneToMany(mappedBy = "donationConfirm")
    List<DonationConfirmImage> images = new ArrayList<>();

    @Builder
    public DonationConfirm(Integer donationId, Integer memberId, String title, String content) {
        this.donationId = donationId;
        this.memberId = memberId;
        this.title = title;
        this.content = content;
    }
}
