package com.ssafy.helpus.donation.repository;

import com.ssafy.helpus.donation.entity.Donation;
import com.ssafy.helpus.donation.enumClass.DonationStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {
    //기부 글 목록 - 메인, 기부 페이지
    Page<Donation> findByStatus(DonationStatus status, Pageable pageable);
    //기부 글 목록 - 기관 페이지
    Page<Donation> findByMemberIdAndStatus(Long memberId, DonationStatus status, Pageable pageable);
    //후기 미작성 글 목록
    @Query("select d from Donation d left join DonationConfirm c on d.donationId = c.donationId " +
            "where c.donationConfirmId is null and d.status = '마감' and d.memberId = :memberId")
    Page<Donation> findByMemberId(Long memberId, Pageable pageable);

    List<Donation> findByMemberId(Long memberId);

    List<Donation> findByEndDateBeforeAndStatus(LocalDate now, DonationStatus status);
}
