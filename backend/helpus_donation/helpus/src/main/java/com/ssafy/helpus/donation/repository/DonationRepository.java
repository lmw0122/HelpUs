package com.ssafy.helpus.donation.repository;

import com.ssafy.helpus.donation.entity.Donation;
import com.ssafy.helpus.donation.enumClass.DonationStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {
    //메인, 기부 페이지
    Page<Donation> findByStatus(DonationStatus status, Pageable pageable);
    //기관 페이지
    Page<Donation> findByMemberId(Long memberId, Pageable pageable);

    List<Donation> findByMemberId(Long memberId);
}
