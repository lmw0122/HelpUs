package com.ssafy.helpus.volunteer.repository;

import com.ssafy.helpus.volunteer.entity.Volunteer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface VolunteerRepository extends JpaRepository<Volunteer, Long> {
    Page<Volunteer> findByCategory(String category, Pageable pageable);
    Page<Volunteer> findByCategoryAndStatus(String category, int status, Pageable pageable);
    Page<Volunteer> findByMemberId(Long memberId, Pageable pageable);
    Page<Volunteer> findByMemberIdAndStatus(Long memberId, int status, Pageable pageable);
    List<Volunteer> findByVolDateBeforeAndStatusAndCategory(LocalDateTime now, int status, String category);
    Page<Volunteer> findByTitleContainingAndCategory(String title, String category, Pageable pageable);
    int countAllByCategory(String category);
    int countAllByMemberId(Long memberId);
}
