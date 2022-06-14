package com.ssafy.helpus.donation.repository;

import com.ssafy.helpus.donation.entity.DonationProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DonationProductRepository extends JpaRepository<DonationProduct, Long> {
    @Query("select sum(d.finishCount) / sum(d.totalCount) * 100.0 from DonationProduct d where d.donation.donationId = :donationId")
    double percentCalculation(Long donationId);
}
