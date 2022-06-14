package com.ssafy.helpus.donation.repository;

import com.ssafy.helpus.donation.entity.DonationConfirmImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonationConfirmImageRepository extends JpaRepository<DonationConfirmImage, Long> {
}
