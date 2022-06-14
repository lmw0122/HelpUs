package com.ssafy.helpus.donation.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "donation_image")
public class DonationImage {
    @Id @Column(name = "donation_image_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long donationImageId;

    @ManyToOne
    @JoinColumn(name = "donation_id", nullable = false)
    private Donation donation;

    @Column(nullable = false)
    private String url;

    @Builder
    public DonationImage(Donation donation, String url) {
        this.donation = donation;
        this.url = url;
    }
}
