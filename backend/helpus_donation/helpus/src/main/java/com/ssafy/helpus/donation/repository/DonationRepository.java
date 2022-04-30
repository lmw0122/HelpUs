package com.ssafy.helpus.donation.repository;

import com.ssafy.helpus.donation.entity.Donation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Integer> {
}
