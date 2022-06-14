package com.ssafy.helpus.volunteer.entity;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "volunteer_image")
public class VolunteerImage {

    @Id @Column(name = "volunteer_image_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long volunteerImageId;

    @ManyToOne
    @JoinColumn(name = "volunteer_id", nullable = false)
    private Volunteer volunteer;

    @Column(nullable = false)
    private String url;

    @Builder
    public VolunteerImage(Volunteer volunteer, String url){
        this.volunteer = volunteer;
        this.url = url;
    }
}
