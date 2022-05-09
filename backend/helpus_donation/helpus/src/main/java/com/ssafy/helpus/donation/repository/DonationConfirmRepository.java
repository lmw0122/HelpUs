package com.ssafy.helpus.donation.repository;

import com.ssafy.helpus.donation.entity.DonationConfirm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonationConfirmRepository extends JpaRepository<DonationConfirm, Long> {
    Page<DonationConfirm> findByMemberId(Long memberId, Pageable pageable);
}
