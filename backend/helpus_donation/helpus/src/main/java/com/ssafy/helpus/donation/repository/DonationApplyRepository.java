package com.ssafy.helpus.donation.repository;

import com.ssafy.helpus.donation.entity.DonationApply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonationApplyRepository extends JpaRepository<DonationApply, Long> {
}
