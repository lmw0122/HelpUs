package com.ssafy.helpus.donation.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "donation_confirm_image")
public class DonationConfirmImage {
    @Id @Column(name = "donation_confirm_image_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer DonationConfirmImageId;

    @ManyToOne
    @JoinColumn(name = "donation_confirm_id", nullable = false)
    private DonationConfirm donationConfirm;

    @Column(nullable = false)
    private String url;

    @Builder
    public DonationConfirmImage(DonationConfirm donationConfirm, String url) {
        this.donationConfirm = donationConfirm;
        this.url = url;
    }
}
