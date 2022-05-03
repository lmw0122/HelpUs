package com.ssafy.helpus.donation.repository;

import com.ssafy.helpus.donation.entity.DonationConfirm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonationConfirmRepository extends JpaRepository<DonationConfirm, Long> {
}
