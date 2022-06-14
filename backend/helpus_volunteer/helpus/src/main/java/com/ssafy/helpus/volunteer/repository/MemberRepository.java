package com.ssafy.helpus.volunteer.repository;

import com.ssafy.helpus.volunteer.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
}
