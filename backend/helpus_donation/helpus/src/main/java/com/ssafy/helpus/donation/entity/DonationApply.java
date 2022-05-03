package com.ssafy.helpus.donation.entity;

import com.ssafy.helpus.donation.enumClass.ApplyStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor
@Table(name = "donation_apply")
public class DonationApply {
    @Id @Column(name = "donation_apply_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long donationApplyId;

    @Column(name = "donation_id", nullable = false, updatable = false)
    private Long donationId;

    @Column(name = "member_id", nullable = false, updatable = false)
    private Long memberId;

    @Column(name = "express_num")
    private Integer expressNum;

    @Column(name = "donation_date", insertable = false, updatable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate donationDate;

    @Enumerated(EnumType.STRING)
    private ApplyStatus status;

    @OneToMany(mappedBy = "donationApply", fetch = FetchType.EAGER)
    List<DonationApplyProduct> applyProducts = new ArrayList<>();

    @Builder
    public DonationApply(Long donationId, Long memberId, Integer expressNum, ApplyStatus status) {
        this.donationId = donationId;
        this.memberId = memberId;
        this.expressNum = expressNum;
        this.status = status;
    }
}
