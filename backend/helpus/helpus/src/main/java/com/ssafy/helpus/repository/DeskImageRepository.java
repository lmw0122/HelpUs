package com.ssafy.helpus.repository;

import com.ssafy.helpus.model.HelpDeskImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeskImageRepository extends JpaRepository<HelpDeskImage, Long> {
}
