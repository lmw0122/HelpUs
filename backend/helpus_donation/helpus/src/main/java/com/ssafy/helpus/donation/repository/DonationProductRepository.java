package com.ssafy.helpus.donation.repository;

import com.ssafy.helpus.donation.entity.DonationProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonationProductRepository extends JpaRepository<DonationProduct, Integer> {
}
