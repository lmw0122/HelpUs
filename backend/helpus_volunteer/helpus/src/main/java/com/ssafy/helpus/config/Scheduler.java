package com.ssafy.helpus.config;

import com.ssafy.helpus.volunteer.entity.Volunteer;
import com.ssafy.helpus.volunteer.repository.VolunteerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class Scheduler {

    private final VolunteerRepository volunteerRepository;

    @Scheduled(cron = "0 * * * * *", zone = "Asia/Seoul")
    @Transactional
    public void VolunteerStatus(){
        log.info("Scheduler VolunteerStatus call");

        List<Volunteer> list = volunteerRepository.findByVolDateBeforeAndStatusAndCategory(LocalDateTime.now(), 0, "ORG");
        for (Volunteer volunteer : list){
            volunteer.setStatus(1);
        }
    }
}
