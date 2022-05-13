package com.ssafy.helpus.repository;

import com.ssafy.helpus.model.Certification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CertificationRepository extends JpaRepository<Certification,Integer> {

    public Certification findByCertificationNum(String num);
}
