package com.ssafy.helpus.donation.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "donation_apply_product")
public class DonationApplyProduct {
    @Id @Column(name = "donation_apply_product_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long donationApplyProductId;

    @ManyToOne
    @JoinColumn(name = "donation_apply_id", nullable = false, updatable = false)
    private DonationApply donationApply;

    @OneToOne
    @JoinColumn(name = "donation_product_id", nullable = false, updatable = false)
    private DonationProduct donationProduct;

    @Column(updatable = false)
    private int count;

    @Builder
    public DonationApplyProduct(DonationApply donationApply, DonationProduct donationProduct, int count) {
        this.donationApply = donationApply;
        this.donationProduct = donationProduct;
        this.count = count;
    }
}
