package com.ssafy.helpus.repository;

import com.ssafy.helpus.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member,Integer> {

    public Member findByMemberId(int memberId);
    public Member findByEmailAndPassword(String email,String password);
}
