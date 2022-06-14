package com.ssafy.helpus.donation.repository;

import com.ssafy.helpus.donation.entity.Donation;
import com.ssafy.helpus.donation.entity.DonationApply;
import com.ssafy.helpus.donation.enumClass.ApplyStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DonationApplyRepository extends JpaRepository<DonationApply, Long> {
    Page<DonationApply> findByMemberIdAndStatusNot(Long memberId, ApplyStatus status, Pageable pageable);

    Page<DonationApply> findByStatusAndDonationIn(ApplyStatus status, List<Donation> donations, Pageable pageable);

    Page<DonationApply> findByStatusAndDonation(ApplyStatus status, Donation donation, Pageable pageable);

    Page<DonationApply> findByMemberIdAndStatus(Long memberId, ApplyStatus status, Pageable pageable);

    List<DonationApply> findByStatusAndInvoiceEndDateBefore(ApplyStatus status, LocalDate date);

    List<DonationApply> findByMemberIdAndStatusOrderByDonationApplyIdDesc(Long memberId, ApplyStatus status);
}
