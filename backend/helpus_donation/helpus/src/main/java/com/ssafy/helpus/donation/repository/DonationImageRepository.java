package com.ssafy.helpus.donation.repository;

import com.ssafy.helpus.donation.entity.DonationImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonationImageRepository extends JpaRepository<DonationImage, Long> {
}
