package com.ssafy.helpus.donation.repository;

import com.ssafy.helpus.donation.entity.DonationApplyProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonationApplyProductRepository extends JpaRepository<DonationApplyProduct, Long> {
}
