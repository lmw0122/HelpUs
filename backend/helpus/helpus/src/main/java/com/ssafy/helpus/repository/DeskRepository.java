package com.ssafy.helpus.repository;

import com.ssafy.helpus.config.enumClass.DeskCategory;
import com.ssafy.helpus.model.HelpDesk;
import com.ssafy.helpus.model.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeskRepository extends JpaRepository<HelpDesk, Long> {
    //작성자별 조회
    Page<HelpDesk> findByMember(Member member, Pageable pageable);
    //카테고리 조회
    Page<HelpDesk> findByCategory(DeskCategory category, Pageable pageable);
    //전체 검색
    Page<HelpDesk> findByContentContainingIgnoreCaseOrTitleContainingIgnoreCase(String word, String word2, Pageable pageable);
    //카테고리내 검색
    Page<HelpDesk> findByCategoryAndContentContainingIgnoreCaseOrTitleContainingIgnoreCase(DeskCategory category, String word, String word2, Pageable pageable);
}
