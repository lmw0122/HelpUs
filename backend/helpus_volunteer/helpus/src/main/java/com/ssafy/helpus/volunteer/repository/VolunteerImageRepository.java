package com.ssafy.helpus.volunteer.repository;

import com.ssafy.helpus.volunteer.entity.VolunteerImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VolunteerImageRepository extends JpaRepository<VolunteerImage, Long> {
}
