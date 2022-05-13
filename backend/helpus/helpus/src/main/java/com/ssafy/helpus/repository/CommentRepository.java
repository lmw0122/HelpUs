package com.ssafy.helpus.repository;

import com.ssafy.helpus.model.HelpDesk;
import com.ssafy.helpus.model.HelpDeskComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<HelpDeskComment, Long> {
    boolean existsByHelpDesk(HelpDesk helpDesk);
}
