package com.ssafy.helpus.repository;

import com.ssafy.helpus.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member,Integer> {

    public Member findByMemberId(int memberId);
    public Member findByEmailAndPassword(String email,String password);
    public Member findByTel(String tel);
    public Member findByEmail(String email);
    @Query(nativeQuery = true,value = "SELECT COUNT(*) FROM member")
    public int getCount();
    @Query(nativeQuery = true,value = "SELECT COUNT(*) FROM member WHERE role='ORG_WAIT'")
    int getWaitCount();
    @Query(nativeQuery = true,value = "SELECT * FROM member WHERE role='ORG_WAIT'")
    List<Member> getWaitMembers();
}
