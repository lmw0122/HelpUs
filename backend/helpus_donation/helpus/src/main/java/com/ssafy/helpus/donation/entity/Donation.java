package com.ssafy.helpus.donation.entity;

import com.ssafy.helpus.donation.enumClass.DonationStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor
@Table(name = "donation")
public class Donation {
    @Id @Column(name = "donation_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @Column(name = "end_date", updatable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    @Column(nullable = false, insertable = false)
    private double percent;

    @Column(insertable = false)
    @Enumerated(EnumType.STRING)
    private DonationStatus status;

    @OneToMany(mappedBy = "donation")
    List<DonationImage> images = new ArrayList<>();

    @OneToMany(mappedBy = "donation", fetch = FetchType.EAGER)
    List<DonationProduct> products = new ArrayList<>();

    @Builder
    public Donation(Integer memberId, String title, String content, LocalDate endDate) {
        this.memberId = memberId;
        this.title = title;
        this.content = content;
        this.endDate = endDate;
    }
}
