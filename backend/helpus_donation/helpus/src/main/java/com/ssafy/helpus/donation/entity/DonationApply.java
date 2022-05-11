package com.ssafy.helpus.donation.entity;

import com.ssafy.helpus.donation.enumClass.ApplyStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter @Setter
@NoArgsConstructor
@Table(name = "donation_apply")
public class DonationApply {
    @Id @Column(name = "donation_apply_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long donationApplyId;

    @ManyToOne
    @JoinColumn(name = "donation_id", nullable = false)
    private Donation donation;

    @Column(name = "member_id", nullable = false, updatable = false)
    private Long memberId;

    private String parcel;

    private Integer invoice;

    @OneToOne
    @JoinColumn(name = "donation_product_id", nullable = false, updatable = false)
    private DonationProduct donationProduct;

    @Column(updatable = false)
    private int count;

    @Column(name = "donation_date", insertable = false, updatable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate donationDate;

    @Column(name = "invoice_end_date", insertable = false, updatable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate invoiceEndDate;

    @Enumerated(EnumType.STRING)
    private ApplyStatus status;

    @Builder
    public DonationApply(Donation donation, Long memberId, DonationProduct donationProduct, String parcel, Integer invoice, int count, ApplyStatus status) {
        this.donation = donation;
        this.memberId = memberId;
        this.donationProduct = donationProduct;
        this.parcel = parcel;
        this.invoice = invoice;
        this.count = count;
        this.status = status;
    }
}
