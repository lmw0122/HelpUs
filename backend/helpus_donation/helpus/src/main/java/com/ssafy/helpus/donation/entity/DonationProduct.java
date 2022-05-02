package com.ssafy.helpus.donation.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "donation_product")
public class DonationProduct {
    @Id @Column(name = "donation_product_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer donationProductId;

    @ManyToOne
    @JoinColumn(name = "donation_id", nullable = false, updatable = false)
    private Donation donation;

    @OneToOne
    @JoinColumn(name = "product_id", nullable = false, updatable = false)
    private Product product;

    @Column(name = "product_info", nullable = false, updatable = false)
    private String productInfo;

    @Column(name = "finish_count", insertable = false)
    private int finishCount;

    @Column(name = "delivery_count", insertable = false)
    private int deliveryCount;

    @Column(nullable = false, insertable = false)
    private double percent;

    @Builder
    public DonationProduct(Donation donation, Product product, String productInfo) {
        this.donation = donation;
        this.product = product;
        this.productInfo = productInfo;
    }
}
