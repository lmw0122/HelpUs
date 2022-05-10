package com.ssafy.helpus.repository;

import com.ssafy.helpus.model.HelpDesk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeskRepository extends JpaRepository<HelpDesk, Long> {
}
